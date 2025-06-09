import { questionsAttachmentBucket } from "@/name"
import { storage } from "./config"
import { Permission } from "node-appwrite"

export const createOrgetBucket = async () => {
    try {
        await storage.getBucket(questionsAttachmentBucket)
        console.log("Storage Connected")
    } catch (error) {
        try {
            await storage.createBucket(questionsAttachmentBucket, questionsAttachmentBucket, [
                Permission.read("any"),
                Permission.read("users"),
                Permission.write("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ], false)
            console.log("storage created")
            console.log("storage Connected")
        } catch (error) {
            console.error("failed to create bucket")
            console.error(error)
        }
        console.error("failed to connect to bucket or bucket doesnt exist")
        console.error(error)
    }
}