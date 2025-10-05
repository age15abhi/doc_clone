import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

// create the connection with the convex database
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// create the post request
export async function POST(req: Request) {
  const { sessionClaims, orgId } = await auth();


  console.log("orgId ===> ", orgId);

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  console.log("user ===> ", user);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // obtain the room from the request body
  // when create the each document it create the room
  // which is match with the document id
  const { room } = await req.json();

  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    return new Response("Unauthorized", { status: 401 });
  }

  // if the document is present then check for the is the user is the document owner
  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === orgId
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized", { status: 401 });
  }

  // create the liveblocks session
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name:
        user.firstName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
      avatar: user.imageUrl,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  console.log("body ===> ", body, "status ===> ", status);

  return new Response(body, { status });
}
