"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export async function getDocuments(ids: Id<"documents">[]){
  return await convex.query(api.documents.getByIds, {ids})
}

export const getUsers = async () => {
  const { orgId } = await auth();

  const clerk = await clerkClient();

  console.log("clerk ===> ", clerk);

  const response = await clerk.users.getUserList({
    organizationId: [orgId as string],
  });

 const users = response.data.map((user) =>( {
  
        id: user.id,
        name: user.firstName ?? user.primaryEmailAddress?.emailAddress ?? "Annonymous",
        avatar: user.imageUrl
   
 }))

 return users
};
