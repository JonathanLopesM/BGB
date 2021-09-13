import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

import Head from 'next/head';
import Image from "next/image";

import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string;
    title: string;
    secretimage:string;
    content: string;
    player: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps){
  return (
    <>
      <Head>
        <title>{post.title} | BGB </title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <Image src={post.secretimage} 
            width={1200} height={380} 
            alt="secretplayer"
          ></Image>
          <div
          className={styles.postContent}
            dangerouslySetInnerHTML={{__html: post.content}}
          />
          <Image src={post.player} 
            width={1200} height={1200} 
            alt="player"
          ></Image>
        </article>
      </main>
    </>
  )
}

 const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const session = await getSession({ req })
    const slug  = params?.slug;

    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('posts', String(slug), {})
    
    
    const post = {

      slug,
      title: RichText.asText(response.data.title),
      secretimage: response.data.secretimage.url,
      player: response.data.player.url,
      content: RichText.asHtml(response.data.content),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US',{
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }

    if(!session?.activeSubscription) {
      return {
        redirect : {
          destination: `/`,
          permanent: false,
        }
      }
    }


return {
  props: {
    post,
  }
 }
}