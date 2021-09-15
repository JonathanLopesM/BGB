
import { query } from 'faunadb';

import NextAuth from "next-auth";
import Provider from "next-auth/providers";

import { fauna } from '../../../services/fauna';


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Provider.Cognito({
    //   clientId: process.env.COGNITO_CLIENT_ID,
    //   clientSecret: process.env.COGNITO_CLIENT_SECRET,
    //   domain: process.env.COGNITO_DOMAIN,
    // }),
    Provider.Google({
      clientId:process.env.GOOGLE_ID,
      clientSecret:process.env.GOOGLE_SECRET,
      authorizationUrl:'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    })
    // ...add more providers here
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async session(session) {
      try {
        const userActiveSubscription = await fauna.query(
          query.Get(
            query.Intersection([
              query.Match(
                query.Index('subscription_by_user_ref'),
                query.Select(
                  "ref",
                  query.Get(
                    query.Match(
                      query.Index('user_by_email'),
                      query.Casefold(session.user.email)
                    )
                  )
                )
              ),
              query.Match(
                query.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )

        return {
          ...session,
          activeSubscription : userActiveSubscription
        }
      } catch {
        return {
          ...session,
          activeSubscription: null,
        }
      }
    },
    async signIn( user, account, profile ) {  
      const  email = user.email
      
      try{
        //faunaquery language
        await fauna.query(
          query.If(
            query.Not(
              query.Exists(//on user
                query.Match(
                  query.Index('user_by_email'),
                  query.Casefold(user.email)
                )
              )
            ),
            query.Create(//create incertion metod
              query.Collection('users'),
              { data: { email }}
            ),
            query.Get( //if you don't look for a user that matches this email
              query.Match(
                query.Index('user_by_email'),
                query.Casefold(user.email)
              )
            )
          )
        )

        return true
      } catch {
        return false
      }
      
    },
  }
})