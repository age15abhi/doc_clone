"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { FullScreenLoader } from "@/components/custom/full-screen-loader";
import { toast } from "sonner";
import { getDocuments, getUsers } from "./action";
import { Id } from "../../../../convex/_generated/dataModel";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children, id }: { children: ReactNode; id: string }) {
  // the user is came from the api
  const [users, setUsers] = useState<User[]>([]);

  console.log("users ===> ", users);

  const fetchUsers = useMemo(
    () => async () => {
      {
        try {
          const list = await getUsers();
          console.log("list ===> ", list);
          setUsers(list);
        } catch {
          toast.error("Failed to fetch users");
        }
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = id as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);

        console.log("documents ==> ", documents);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={id}
        initialStorage={{ leftMargin: 56, rightMargin: 56 }}
      >
        <ClientSideSuspense
          fallback={<FullScreenLoader label="room loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
