
import { query } from 'faunadb';

import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import CognitoProvider from "next-auth/providers"

import { fauna } from '../../../services/fauna';


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Provider.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
      Provider.Cognito({
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        domain: process.env.COGNITO_DOMAIN,
      })
    
    // ...add more providers here
  ],
  // session: {
  //   jwt: true,
  // },
  // jwt: {
  //   signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  // },
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