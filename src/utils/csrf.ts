import crypto from 'crypto'

// Generate a CSRF token
export function generateCsrfToken() {
  return crypto.randomBytes(64).toString('hex')
}

// Verify a CSRF token
export function verifyCsrfToken(token: any, sessionToken: any) {
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(sessionToken))
}
