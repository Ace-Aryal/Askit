import { env } from "@/env";

import { Client, Databases, Avatars, Users, Storage } from "node-appwrite"

const client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikeyone) // Your secret API key
    ;

const database = new Databases(client);
const storage = new Storage(client);
const avatar = new Avatars(client)
const user = new Users(client)


export { user, database, storage, avatar, client }
