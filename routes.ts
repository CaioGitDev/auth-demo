/**
 * @description Public routes
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/']

/**
 * @description Authentication routes
 * @type {string[]}
 */
export const authRoutes: string[] = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
]

/**
 * @description API prefix routes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth'

/**
 * @description Default login redirect
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/dashboard'

/**
 * @description Default logout redirect
 * @type {string}
 */
export const DEFAULT_LOGOUT_REDIRECT: string = '/login'
