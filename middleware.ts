import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/'],
}

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, password] = atob(authValue).split(':')

    if (user === process.env.BASIC_ID && password === process.env.BASIC_PWD) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Unauthorized.', {
    status: 401,
    headers: {
      'WWW-authenticate': 'Basic realm="Secure Area"',
    },
  })
}
