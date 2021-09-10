import { query } from "faunadb";

import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId : string,
  customerId: string,
  createAction = false
) {
  //buscar usuario no banco do faunaDB com o ID{customerId}
  const userRef = await fauna.query(
    query.Select(
      "ref",//campo expecifico, pode agregar mais
      query.Get(
        query.Match(
          query.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )
          //buscando todos os dados da subscripion
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,

  }
  if(createAction){
      //salvar os dados da subscription do usuario no faunaDB
  await fauna.query(
    query.Create(
      query.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
  }else{
    await fauna.query(
      query.Replace(//replace substitui toda a subscription
        query.Select(
          "ref",
          query.Get(
            query.Match(
              query.Index('subscription_by_id'),
              subscriptionId,
            )
          )
        ),
        { data: subscriptionData}
      ),
    )
  }
}