import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";

// This function can be marked `async` if using `await` inside

const publicPages = ['/login', '/register']

export function middleware(request: NextRequest) {
    const loggedIn = cookies().get('loggedIn')

    if (loggedIn?.value === 'false' && !publicPages.includes(request.nextUrl.pathname)) {
        // Construct the URL to redirect to the root page with user info
        const url = new URL('/login', request.url)

        return NextResponse.redirect(url)
    }

    // If no user, continue to the requested page
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

