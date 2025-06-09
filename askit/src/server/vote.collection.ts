import { db, voteCollection } from "@/name";
import { database } from "./config";
import { Permission } from "node-appwrite"

export const createVotesCollection = async () => {
    await database.createCollection(db, voteCollection, voteCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("qn collection created")
    await Promise.all([
        database.createStringAttribute(db, voteCollection, "typeId", 128, true),
        database.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
        database.createStringAttribute(db, voteCollection, "voterId", 64, true),
        database.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
    ])
    console.log("attributes created")

}