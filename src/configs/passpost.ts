import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook'
const db = require('../models/index')
import passport from 'passport'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: `${process.env.URL_BACKEND}/api/client/auth/google/callback`
    },
    async (accessToken: string, refreshToken: string, profile: GoogleProfile, cb: (error: any, user?: any) => void) => {
      try {
        const [user, created] = await db.User.findOrCreate({ where: { googleId: profile.id } })
        return cb(null, user)
      } catch (error) {
        return cb(error)
      }
    }
  )
)
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || '',
      clientSecret: process.env.FACEBOOK_APP_ID || '',
      callbackURL: `${process.env.URL_BACKEND}/api/client/auth/facebook/callback`
    },
    async (accessToken: string, refreshToken: string, profile: FacebookProfile, cb: (error: any, user?: any) => void) => {
      try {
        const [user, created] = await db.User.findOrCreate({ where: { facebookId: profile.id } })
        return cb(null, user)
      } catch (error) {
        return cb(error)
      }
    }
  )
)
