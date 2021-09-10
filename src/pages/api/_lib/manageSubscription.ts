import { query } from "faunadb";

import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId : string,
  customerId: string,
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
  const subscripion = await stripe.subscriptions.retrieve(subscriptionId)
  
  const subscripionData = {
    id: subscripion.id,
    userId: userRef,
    status: subscripion.status,
    price_id: subscripion.items.data[0].price.id,

  }
  //salvar os dados da subscription do usuario no faunaDB
  await fauna.query(
    query.Create(
      query.Collection('subscriptions'),
      { data: subscripionData }
    )
  )
}