import { answerCollection, db } from "@/name";
import { database, user } from "@/server/config";
import type { UserPrefs } from "@/srore/auth";
import { NextResponse, NextRequest } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const response = await request.json()
        const { authorId, questionId, answer } = response
        await database.createDocument(db, answerCollection, ID.unique(), {
            questionId,
            authorId,
            content: answer
        })
        //increment reputation
        const prefs = await user.getPrefs<UserPrefs>(authorId)
        await user.updatePrefs(authorId, {
            reputation: prefs.reputation !== undefined ? Number(prefs.reputation) + 1 : 1
        })
        return NextResponse.json(response, {
            status: 201
        })
    }
    catch (error: any) {
        console.error(error)
        return NextResponse.json({
            error: error?.message || "Error posting answer",
            status: error?.status || error?.code || 500
        })
    }
}
export async function DELETE(request: NextRequest) {
    const { answerId } = await request.json()
    try {
        const answer = await database.getDocument(db, answerCollection, answerId)
        const response = await database.deleteDocument(db, answerCollection, answerId)

        const userPrefs = await user.getPrefs<UserPrefs>(answer.authorId)
        await user.updatePrefs(answer.authorID, {
            reputation: Number(userPrefs.reputation) - 1
        })

        return NextResponse.json(response, {
            status: 201
        })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({
            error: error?.message || "Error posting answer",
            status: error?.status || error?.code || 500
        })
    }
}