import {StreamChat} from "stream-chat";

if(!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
  throw new Error(" STREAM_API_KEY is not set");
}
if(!process.env.STREAM_API_SECRET_KEY) {
   throw new Error(" STREAM_API_SECRET is not set");
//   console.log("STREAM_API_SECRET_KEY is missing", process.env.STREAM_API_SECRET_KEY);
}
export const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.STREAM_API_SECRET_KEY
);
