import { db } from "@/name";
import { database } from "./config";
import { createAnswerCollection } from "./answer.collection";
import { createQuestionCollection } from "./question.collection";
import { createVotesCollection } from "./vote.collection";
import { createCommentsCollection } from "./comment.collection";

export async function getOrCreateDb() {
    try {
        await database.get(db)
        console.log("db connected")
    } catch (error) {
        try {
            await database.create(db, db)
            console.log("db created")
            await Promise.all(
                [createAnswerCollection(),
                createQuestionCollection(),
                createVotesCollection(),
                createCommentsCollection()]
            )
            console.log("db created")
            console.log("db connected")
        } catch (error) {
            console.log("error creating db or collections")
            console.error(error)
        }
        console.log("db connection failed ")
        console.error(error)
    }
    return database
}