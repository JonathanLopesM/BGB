import {  GetStaticPaths, GetStaticProps } from "next";
import Link from 'next/link';
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";

import Head from 'next/head';
import Image from "next/image";

import styles from '../post.module.scss'
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    secretimage:string;
    content: string;
    player: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps){
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.activeSubscription){
        router.push(`/posts/${post.slug}`)
    }
  }, [session])


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
          className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{__html: post.content}}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
                <a href="">🏆 SUBSCRIBE NOW 🏆</a>
            </Link>
          </div>
          
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }

}

export const getStaticProps: GetStaticProps = async ({ params}) => {
    const slug  = params?.slug;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('posts', String(slug), {})
    
    
    const post = {

      slug,
      title: RichText.asText(response.data.title),
      secretimage: response.data.secretimage.url,
      player: response.data.player.url,
      content: RichText.asHtml(response.data.content.splice(0, 2)),//(0, 2) paragraph
      updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US',{
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }



return {
  props: {
    post,
  },
  redirect: 60*30, //30 minutes revalidate time
 }
}