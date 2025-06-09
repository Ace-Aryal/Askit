import { answerCollection, db } from "@/name";
import { database } from "./config";
import { Permission } from "node-appwrite"

export const createAnswerCollection = async () => {
    await database.createCollection(db, answerCollection, answerCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("qn collection created")

    await Promise.all([
        database.createStringAttribute(db, answerCollection, "content", 10000, true),
        database.createStringAttribute(db, answerCollection, "authorId", 64, true),
        database.createStringAttribute(db, answerCollection, "questionId", 128, true),
    ])
    console.log("attributes created")

}