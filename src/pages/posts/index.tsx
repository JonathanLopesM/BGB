import { GetStaticProps } from "next";
import Head from "next/head";
import Prismic from "@prismicio/client";
import { getPrismicClient } from "../../services/prismic";
import styles from './styles.module.scss'

export default function Posts(){
  return (
    <>
    <Head>
      <title>Posts | BGB</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.postList}>
        <a href="#">
          <time>12 de março de 2021</time>
          <strong>Creating a monorepo with lenaa yarn workspaces</strong>
          <p>Lorem ipsum dolor sit amet. Est molestiae officia et facere voluptas ut mollitia ratione eum Quis consequatur id accusantium nulla aut voluptas omnis. Ab illo laborum qui nisi.</p>
        </a>
        <a href="#">
          <time>12 de março de 2021</time>
          <strong>Creating a monorepo with lenaa & yarn workspaces</strong>
          <p>Lorem ipsum dolor sit amet. Est molestiae officia et facere voluptas ut mollitia ratione eum Quis consequatur id accusantium nulla aut voluptas omnis. Ab illo laborum qui nisi.</p>
        </a>
        <a href="#">
          <time>12 de março de 2021</time>
          <strong>Creating a monorepo with lenaa & yarn workspaces</strong>
          <p>Lorem ipsum dolor sit amet. Est molestiae officia et facere voluptas ut mollitia ratione eum Quis consequatur id accusantium nulla aut voluptas omnis. Ab illo laborum qui nisi.</p>
        </a>
      </div>
    </main>
    
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['title', 'content'],
    pageSize: 100,
  })

  console.log(response)

  return{
    props: {

    }
  }

}