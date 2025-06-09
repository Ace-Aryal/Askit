import { db, questionCollection } from "@/name";
import { database } from "./config";
import { Permission } from "node-appwrite"

export const createCommentsCollection = async () => {
    await database.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("cmt collection created")

    await Promise.all([
        database.createStringAttribute(db, questionCollection, "typeId", 128, true),
        database.createStringAttribute(db, questionCollection, "content", 10000, true),
        database.createStringAttribute(db, questionCollection, "authorId", 64, true),
        database.createEnumAttribute(db, questionCollection, "type", ["question", "answer"], true),
    ])
    console.log("cmt attributes created")


}