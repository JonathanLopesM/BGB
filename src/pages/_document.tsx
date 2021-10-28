import Document, { Html,Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  render(){
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@500;700&display=swap" rel="stylesheet"/>
          <link rel="shortcut icon" href="BGB.ico" type="image/x-icon" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
        
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>

    )
  }
}