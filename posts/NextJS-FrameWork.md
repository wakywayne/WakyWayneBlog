---
title: 'NextJS'
date: 'September 22, 2022'
excerpt: 'My NextJS notes *Including typings at the bottom*'
cover_image: ''
category: 'FrameWorks'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# NEXT
### You should always have a default image to use if something doesn't exist use that url path as the conditional This work much nicer than other solutions do with next if you use a favicon it seems to not work not sure what that is about

## Auth
### You should use http only cookie it's an advantage of using NEXT [see auth](../AuthenticationSecurity/auth.md)

## Special rules
--------------------
### Dynamic Imports
```javascript
import dynamic from 'next/dynamic'

  const Map = dynamic(() => import('@/components/NewMapBoxMap'), {
    // Display a div while loading
    loading: () => <div>Loading...</div>,
    ssr: false
  }
  )
```

### Images
- To use images from outside sources you must make a next.config.js file
```javascript
        module.exports = {
          images: {
            domains: ['res.cloudinary.com'],
          },
        }
```

### Modals
*When the page renders you dont have acess to the window.document*
- make a file called _document.js in pages
```javascript
        import Document, { Html, Head, Main, NextScript } from 'next/document'

        class MyDocument extends Document {
          static async getInitialProps(ctx) {
            const initialProps = await Document.getInitialProps(ctx)
            return { ...initialProps }
          }

          render() {
            return (
              <Html>
                <Head />
                <body>
                  <Main />
                  <NextScript />
                  <div id='modal-root'></div>
                </body>
              </Html>
            )
          }
        }

        export default MyDocument
```
- Then make a modal component
```javascript
        import { useState, useEffect } from 'react'
        import ReactDOM from 'react-dom'
        import { FaTimes } from 'react-icons/fa'
        import styles from '@/styles/Modal.module.css'

        export default function Modal({ show, onClose, children, title }) {
          const [isBrowser, setIsBrowser] = useState(false)

          useEffect(() => setIsBrowser(true))

          const handleClose = (e) => {
            e.preventDefault()
            onClose()
          }

          const modalContent = show ? (
            <div className={styles.overlay}>
              <div className={styles.modal}>
                <div className={styles.header}>
                  <a href='#' onClick={handleClose}>
                    <FaTimes />
                  </a>
                </div>
                {title && <div>{title}</div>}
                <div className={styles.body}>{children}</div>
              </div>
            </div>
          ) : null

          if (isBrowser) {
            return ReactDOM.createPortal(
              modalContent,
              document.getElementById('modal-root')
            )
          } else {
            return null
          }
        }

        // https://devrecipes.net/modal-component-with-next-js/
```
- CSS
```css
        .modal {
          background: white;
          width: 500px;
          height: 600px;
          border-radius: 15px;
          padding: 20px;
          z-index: 100;
        }

        .header {
          display: flex;
          justify-content: flex-end;
          font-size: 25px;
        }

        .body {
          padding-top: 10px;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
        }
```
### Using backend functions
__You can use backend function on the *"frontend"*, but you can only actually use them in your server functions at the bottom of the file__
```javascript
export async function getStaticProps({ params }) {
    const slug = params.slug;

    const markdownWithMeta = fs.readFileSync(path.join('posts', `${slug}.md`), 'utf8');

    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
        props: {
            frontmatter,
            content,
            slug
        },
    }
}
```

# Set Up
**create-next-app name-of-project**
- _app.js file is where in the component tag whatever the current page is will be rendered
- css is stored in module system Home.module.css
    - The only place you can import global styles is in app.js
- *Make a layout Component that will wrap each page*
```javascript
        import Head from 'next/head'
        import { useRouter } from 'next/router'
        import Header from './Header'
        import Footer from './Footer'
        import Showcase from './Showcase'
        import styles from '@/styles/Layout.module.css'
        <!-- Here is the Layout styles -->
            .container {
              margin: 60px auto;
              max-width: 960px;
              padding: 0 30px;
            }


        export default function Layout({ title, keywords, description, children }) {
            const router = useRouter()
            
            return (
                <div>
                  <Head>
                    <title>{title}</title>
                    <meta name='description' content={description} />
                    <meta name='keywords' content={keywords} />
                  </Head>
                
                  <Header />
                
                  {router.pathname === '/' && <Showcase />}
                
                  <div className={styles.container}>{children}</div>
                  <Footer />
                </div>
            )
        }
            Layout.defaultProps = {
              title: 'DJ Events | Find the hottest parties',
              description: 'Find the latest DJ and other musical events',
              keywords: 'music, dj, edm, events',
            }
```
- Also make a 404.js page this will be the new default
- *Make a jsconfig.json*
```javascript
        {
          "compilerOptions": {
            "baseUrl": ".",
            "paths": {
              "@/components/*": ["components/*"],
              "@/styles/*": ["styles/*"],
              "@/config/*": ["config/*"],
              "@/context/*": ["context/*"],
              "@/helpers/*": ["helpers/*"]
            }
          }
        }
```


# Routing/ Pages
- Use folder with index.js to act as the default route
- To do dynamic pages add brackets *[id].js* 
- Do not route with regular link tags this causes a full rerender Link, next/link
- to get routing parameters import {useRouter} from next/router
    - const router = useRouter();
    - router.query.id will get you the [id] from [id].js
    - router.push('/') *will take you home*
    - router.reload() *will reload the page*
    - router.pathname *will get the pathname ie '/' for home*
 

# Data Fetching
>**You cannot use next export with api routes**
>**Use the standard req, res syntax in the api**
>- To allow or limit the kind of request you can use 
> ```javascript
>            export default (req, res)=> {
>                if (req.method === 'GET'){
>                    res.status(200).json(theDataThatWasReq)
>                }else{
>                    res.setHeader('Allow', ['GET']) res.status(405)
>                    res.status(405).json({message:`Method ${req.method} is not allowed, nice try tho`})
>                }
>            }
> ```

> # These functions run when you visit the page
> ### The routes must be _<u>real</u>_, so you have to use NEXT_PUBLIC_API_URL || localhost:3000 (1337 if using strapi) in .ENV _You must have NEXT_PUBLIC before the name or it wont be available to the front end_
> 
> ## getServerSideProps()
> **Re fetches the data every time you visit the page**
> 
> ```javascript
> export async function getServerSideProps({ query: { slug } }) {
> const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`)
> const events = await res.json()
> 
>   return {
>     props: {
>       evt: events.data[0].attributes,
>       evtVidsWithoutAttributes: events.data[0].attributes.event_videos.data,
>     },
>   }
> }
> ```
> ## getStaticPaths()
> **Creates dynamic routes looks at backend data (all the ids or slugs) and generates all the paths for those different routes _only works if your website is static_**
> 
> ```javascript
>   export async function getStaticPaths() {
>   const res = await fetch(`${API_URL}/events`)
>   const events = await res.json()
>   const paths = events.data.map((evt) => ({
>     params: { slug: evt.slug },
>   }))
>   return {
> //    this is what th path should look like:
> // paths: [
> //   {params: { slug: 'event-1' }},
> //   {params: { slug: 'event-2' }},
> //   {params: { slug: 'event-3' }},
> // ]
>     paths,
>     fallback: true,
> // fallback: true means that if it dosen't find data at build time it will refetch it when the page is visited. If it was false it would just give a 404 
>   }
> }
> ```
>
> ## getStaticProps()
> **Fetches only at build time**
> 
> ```javascript
>  export async function getStaticProps({ params: { slug } }) {
>// it is called params because it is the params that is passed in from getStaticPaths
>    const res = await fetch(`${API_URL}/events?slug=${slug}`)
>    const events = await res.json()
>    return {
>      props: {
>        evt: events[0],
>      },
>      revalidate: 1,
>    }
>  }
> ```

# Types

```javascript
Using TypeScript with Next.js (Updated)
How to set up TypeScript in a Next.js Project
The best place to find the information about setting up TypeScript is the documentation: https://nextjs.org/docs/basic-features/typescript



Creating a basic page
You don't need to do anything special to create a simple page:

const MyPage = () => {
  return <div>Hello World!</div>;
};
 
export default MyPage;
Resources

Next.js pages documentation



How to type a custom App component
The following example is taken from the original documentation (https://nextjs.org/docs/basic-features/typescript#custom-app):

// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
 
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
 
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
 
//   return { ...appProps }
// }
 
export default MyApp
Resources

Custom App documentation



getServerSideProps
Basic usage:

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
 
export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { name: 'John' } };
};
 
const MyPage = () => {
  return <div>Hello World!</div>;
};
 
export default MyPage;
To infer the props returned by getServerSideProps:

import { InferGetServerSidePropsType } from 'next';
 
export const getServerSideProps = async () => {
  return { props: { name: 'John' } };
};
 
type MyPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
 
const MyPage = (props: MyPageProps) => {
  return <div>Hello, {props.name}!</div>;
};
 
export default MyPage;
However, if you need to use the getServerSideProps' arguments, you can do the following:

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
 
interface ServerSideProps {
  name: string;
}
 
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  // Use the context argument somehow.
  return { props: { name: 'John' } };
};
 
type MyPageProps = ServerSideProps;
// You can still infer the server side props:
// type MyPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
 
const MyPage = (props: MyPageProps) => {
  return <div>Hello, {props.name}!</div>;
};
 
export default MyPage;
Resources

getServerSideProps documentation



getStaticProps
Basic usage:

import { GetStaticProps } from 'next';
 
export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
 
const MyPage = () => {
  return <div>Hello, World!</div>;
};
 
export default MyPage;
To infer the props of getStaticProps:

import { GetStaticProps, InferGetStaticPropsType } from 'next';
 
export const getStaticProps = async () => {
  return { props: { name: 'Jack' } };
};
 
const MyPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>Hello, {props.name}!</div>;
};
 
export default MyPage;
If you need to use the arguments of getStaticProps:

import { GetStaticProps, InferGetStaticPropsType } from 'next';
 
interface StaticProps {
  name: string;
}
 
export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  // Use the context argument somehow.
  return { props: { name: 'Jack' } };
};
 
type MyPageProps = StaticProps;
// You can still infer the static props like this:
// type MyPageProps = InferGetStaticPropsType<typeof getStaticProps>;
 
const MyPage = (props: MyPageProps) => {
  return <div>Hello, {props.name}!</div>;
};
 
export default MyPage;
Resources

getStaticProps documentation



getStaticPaths
import { GetStaticPaths } from 'next';
 
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      // ...
    ],
    fallback: // ...
  };
};
Resources

getStaticPaths documentation



getInitialProps
import { NextPage } from 'next';
 
interface InitialProps {
  userAgent?: string;
}
 
interface PageProps extends InitialProps {
  propThatBelongsToThePageOnly: boolean;
}
 
const MyPage: NextPage<PageProps, InitialProps> = ({
  userAgent,
  propThatBelongsToThePageOnly,
}) => {
  return propThatBelongsToThePageOnly ? (
    <div>Your user agent: {userAgent}</div>
  ) : null;
};
 
MyPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};
 
export default MyPage;
Resources

getInitialProps documentation



Reading a route parameter
// Example: you expect an integer id in pages/[id].tsx
// One of the ways of handling this.
 
import Error from 'next/error';
 
const MyPage = () => {
  const router = useRouter();
  const id = typeof router.query.id === 'string'
    ? parseInt(router.query.id, 10)
    : NaN;
 
  // if (!id) {
	if (isNaN(id) || id < 1) {
    // id is not a number.
    return <Error statusCode={404} />;
  }
 
	return <div>Hello World!</div>;
};
 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.params?.id === 'string'
      ? parseInt(context.params.id, 10)
      : NaN;
 
  if (id) {
    // Do something.
  }
 
  return { props: {} };
};
 
export default MyPage;
Resources

Dynamic routes documentation



Declaring .env variables
You can create a .d.ts file in the project's root for declaring env variables.

// env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
  }
}
Resources

Next.js environment variables documentation



API Routes
Basic usage:

import type { NextApiRequest, NextApiResponse } from 'next';
 
interface ResponseData {
  name: string;
}
 
export default (_req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  res.status(200).json({ name: 'John' });
};
Using NextApiHandler type:

import type { NextApiHandler } from 'next';
 
interface ResponseData {
  name: string;
}
 
const apiRouteHandler: NextApiHandler<ResponseData> = (_req, res) => {
  res.status(200).json({ name: 'John' });
};
 
export default apiRouteHandler;
Resources

API Routes documentation
```