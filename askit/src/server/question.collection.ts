import { db, questionCollection } from "@/name";
import { database } from "./config";
import { IndexType, Permission } from "node-appwrite"


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
        database.createStringAttribute(db, questionCollection, "tags", 512, true, undefined, true),
    ])
    console.log("qn attributes created")
    setTimeout(async () => {
        await Promise.all([
            database.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"], ["asc"]),
            database.createIndex(db, questionCollection, "content", IndexType.Fulltext, ["content"], ["asc"])
        ])
        console.log("indices created")
    }, 1000)




}