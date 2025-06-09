import { env } from "@/env";
import { Client, Account, Databases, Storage, Avatars } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const avatar = new Avatars(client)


export { account, database, storage, avatar, client }
