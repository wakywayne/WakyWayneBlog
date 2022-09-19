import Layout from "@/components/Layout"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Post from "@/components/Post"
import Pagination from "@/components/Pagination"
import CategoryLists from "@/components/CategoryLists"
import { POSTS_PER_PAGE } from "@/config/index"
import { getPosts } from "@/lib/posts"

export default function BlogPage({ posts, numPages, currentPage, categories }) {

    return (
        <Layout>

            <div className="flex justify-between">
                <div className="w-3/4 mr-10">
                    <h1 className="p-5 mb-2 text-5xl font-bold border-b-4 ">Blog</h1>

                    <div className="grid gap-5 md:grid-col-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>

                <div className='w-1/4 '>
                    <CategoryLists categories={categories} />
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


    // Get categories for sidebar
    const categories = posts.map((post) => (post.frontmatter.category))
    // ADD THIS TO HACKS! This goes through the array and removes duplicates
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