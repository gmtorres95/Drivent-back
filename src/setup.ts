import dotenv from "dotenv";

let path = ".env";

if(process.env.NODE_ENV === "test") path = ".env.test";
if(process.env.NODE_ENV === "production") path = ".env.prod";

dotenv.config({ path });
