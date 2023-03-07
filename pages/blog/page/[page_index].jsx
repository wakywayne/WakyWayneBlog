import Layout from "@/components/Layout"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Post from "@/components/Post"
import Pagination from "@/components/Pagination"
import CategoryLists from "@/components/CategoryLists"
import CategoryListsMobile from "@/components/CategoryListsMobile"
import { POSTS_PER_PAGE } from "@/config/index"
import { getPosts } from "@/lib/posts"

export default function BlogPage({ posts, numPages, currentPage, categories }) {

    return (
        <Layout>

            <div className="flex flex-col md:flex-row justify-between">
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

                <div className='block md:hidden w-full '>
                    <CategoryListsMobile categories={categories} />
                </div>
            </div>



            <Pagination currentPage={currentPage} numPages={numPages} />

        </Layout>
    )
}

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

export async function getStaticProps({ params }) {
    const page = parseInt((params && params.page_index) || 1)

    const files = fs.readdirSync(path.join('posts'))

    const posts = getPosts();


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