import { NextRequest, NextResponse } from 'next/server'
import { createOrgetBucket } from './server/storage.seed'
import { getOrCreateDb } from './server/seed'

export async function middleware(_request: NextRequest) {
    await Promise.all([
        getOrCreateDb(),
        createOrgetBucket()
    ])
    return NextResponse.next()
}


export const config = {
    matcher: [
        // Match everything except excluded routes
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
