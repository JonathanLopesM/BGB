
// import  signIn  from "next-auth/client";
import { query } from 'faunadb';

import NextAuth from "next-auth";
import Provider from "next-auth/providers";

import { fauna } from '../../../services/fauna';


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Provider.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      domain: process.env.COGNITO_DOMAIN,
    }),
    // ...add more providers here
  ],
  // jwt:{
  //   signingKey: process.env.SIGNING_KEY
  // },
  callbacks: {
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