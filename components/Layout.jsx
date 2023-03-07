import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Search from './Search'

export default function Layout({ children, title, description, keywords }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='keywords' content={keywords} />
                <meta name='description' content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            {/* <Search /> */}
            <main className=' container mx-auto my-7'>
                {children}
            </main>

        </div>
    )
}

Layout.defaultProps = {
    title: "Welcome To WakyWayne's Blog",
    description: 'Here is a collection of my coding projects with some other useful stuff',
    keywords: "development, coding, programing, next.js, react, blog, wakywayne, wakywayneblog, wakywayneblog.com, wakywayneblog.com/, wayneswildworld",
}