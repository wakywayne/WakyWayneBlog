---
title: 'Pagination'
date: 'September 22, 2022'
excerpt: 'This article will cover most everything you need for pagination in NextJS'
cover_image: ''
category: 'ClientSide'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Pagination in NextJS
---------------------------------

## Making paths from files

```javascript
export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

    let paths = []

    for (let i = 1; i <= numPages; i++) {
        paths.push({
            params: { page_index: i.toString() },
        })
    }

    return {
        paths,
        fallback: false,
    }
}
```

**The above code returns this:**

```javascript
[
  {params:{pae_index:"1"}}
  {params:{pae_index:"2"}}
  {params:{pae_index:"3"}}
]
```

## Using paths 
*We destructor params*

```javascript
export async function getStaticProps({ params }) {
    const page = parseInt((params && params.page_index) || 1)

    const files = fs.readdirSync(path.join('posts'))

    const posts = getPosts();


    // Get categories for sidebar
    const categories = posts.map((post) => (post.frontmatter.category))
    const uniqueCategories = [...new Set(categories)]

    const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
    const pageIndex = page - 1
    const orderedPosts = posts.slice(
        pageIndex * POSTS_PER_PAGE,
        (pageIndex + 1) * POSTS_PER_PAGE
    )

    return {
        props: {
            posts: orderedPosts,
            numPages,
            currentPage: page,
            categories: uniqueCategories,
        },
    }
}
```

## Frontend Component

```javascript
export default function BlogPage({ posts, numPages, currentPage, categories }) {

    return (
        <Layout>

            <div className="flex justify-between">
                <div className="mr-10 sm:w-full md:w-3/4">
                    <h1 className="p-5 mb-2 text-5xl font-bold border-b-4 ">Blog</h1>

                    <div className="grid gap-5 md:grid-col-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>

                <div className='hidden md:inline-block md:w-1/4 '>
                    <CategoryLists categories={categories} />
                </div>

            </div>



            <Pagination currentPage={currentPage} numPages={numPages} />

        </Layout>
    )
}
```

## Pagination Component

```javascript
import React from 'react'
import Link from "next/link"


export default function Pagination({ currentPage, numPages }) {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = `/blog/page/${currentPage - 1}`;
    const nextPage = `/blog/page/${currentPage + 1}`;


    if (numPages === 1) return null;

    return (
        <div className=' flex pl-0 list-none my-2'>
            {!isFirst && (
                <Link href={prevPage}>
                    <li className=' relative block py-2 px-3 leading-tight bg-white border border-blue-300 mr-1 hover:bg-green-200
                    text-blue-800 cursor-pointer'>Previous</li>
                </Link>
            )}


            // 
            // Below is a super cool trick for dynamically generating page numbers that you can use to bring you to that corresponding page
            // 
        
          {Array.from({ length: numPages }, (_, i) => {
                if (i === 0 || i === numPages - 1 || i === currentPage - 1 || i === currentPage || i === currentPage + 1) {
        // The above method only lists the first previous next and last pages I love this TRICK!!!
        // Alternatively you can just list all the pages
            {Array.from({ length: numPages }, (_, i) => (
                // We do plus one because the array starts at zero and there is no page zero
                <Link href={`/blog/page/${i + 1}`} key={`page-${i}`}>
                    <li className='relative block py-2 px-3 leading-tight bg-white border border-blue-300 text-blue-800 mr-1 hover:bg-green-200 cursor-pointer'>
                        {i + 1}
                    </li>
                </Link>
            ))}


            {!isLast && (
                <Link href={nextPage}>
                    <li className=' relative block py-2 px-3 leading-tight bg-white border border-blue-300 text-blue-800 mr-1 hover:bg-green-200
                     cursor-pointer'>Next</li>
                </Link>
            )}
        </div>
    )
}
```