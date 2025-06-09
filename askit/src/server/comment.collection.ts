import { db, commemtCollection } from "@/name";
import { database } from "./config";
import { Permission } from "node-appwrite"

export const createCommentsCollection = async () => {
    await database.createCollection(db, commemtCollection, commemtCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("cmt collection created")

    await Promise.all([
        database.createStringAttribute(db, commemtCollection, "typeId", 128, true),
        database.createStringAttribute(db, commemtCollection, "content", 10000, true),
        database.createStringAttribute(db, commemtCollection, "authorId", 64, true),
        database.createEnumAttribute(db, commemtCollection, "type", ["question", "answer"], true),
    ])
    console.log("cmt attributes created")


}