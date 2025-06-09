import { db, questionCollection } from "@/name";
import { database } from "./config";
import { Permission } from "node-appwrite"

export const createQuestionCollection = async () => {
    await database.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("qn collection created")

    await Promise.all([
        database.createStringAttribute(db, questionCollection, "title", 128, true),
        database.createStringAttribute(db, questionCollection, "content", 10000, true),
        database.createStringAttribute(db, questionCollection, "authorId", 64, true),
        database.createStringAttribute(db, questionCollection, "attachmentId", 128, false),
        database.createStringAttribute(db, questionCollection, "tags", 512, true, "[]", true),
    ])
    console.log("attributes created")

}