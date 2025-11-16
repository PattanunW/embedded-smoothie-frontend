export {default} from 'next-auth/middleware'
export const config = {
    matcher:["/reservations/manage","/manage/:path*","/booking/:path*","/auditlog"]
}