import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is authenticated (you can modify this logic based on your auth implementation)
  const isAuthenticated = checkAuthentication(request)

  // If user is not authenticated and trying to access protected routes
  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If user is authenticated and trying to access auth pages, redirect to home
  if (isAuthenticated && pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}

// Helper function to check if a route is protected
function isProtectedRoute(pathname: string): boolean {
  // Add your protected routes here
  const protectedRoutes = [
    '/profile',
    '/ong',
    '/feed',
    '/notifications',
    '/settings',
  ]

  return protectedRoutes.some(route => pathname.startsWith(route))
}

// Helper function to check authentication
function checkAuthentication(request: NextRequest): boolean {
  // This is a placeholder - implement based on your authentication method
  // Common approaches:

  // 1. Check for JWT token in cookies
  const token = request.cookies.get('auth-token')?.value

  // 2. Check for session cookie
  const session = request.cookies.get('session')?.value

  // 3. Check for authorization header
  const authHeader = request.headers.get('authorization')

  // Example implementation (modify based on your auth setup):
  if (token || session || authHeader) {
    // You might want to validate the token here
    return true
  }

  return false
}
