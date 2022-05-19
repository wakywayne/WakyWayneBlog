import Layout from "@/components/Layout"
import fs from "fs"
import path from "path"
import Post from "@/components/Post"
import Link from "next/link"
import matter from "gray-matter"
import { sortByDate } from "@/utils/index"
import { getPosts } from "@/lib/posts"

export default function CategoryBlogPage({ posts, categoryName }) {

    return (
        <Layout>
            <h1 className=" text-5xl border-b-4 mb-2 p-5 font-bold">Posts in {categoryName}</h1>

            <div className=" grid md:grid-col-2 lg:grid-cols-3 gap-5">
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
            <Link href='/blog'>
                <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-red-700 focus:outline-none focus:shadow-outline w-full'>
                    All Posts
                </a>
            </Link>
        </Layout>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'));

    const categories = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf8');

        const { data: frontmatter } = matter(markdownWithMeta);

        return frontmatter.category.toLowerCase();

    });

    const paths = categories.map(category => {
        return { params: { category_name: category } }
    });

    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({ params: { category_name } }) {
    const files = fs.readdirSync(path.join('posts'))

    const posts = getPosts()

    // Get categories for sidebar
    // const categories = posts.map((post) => post.frontmatter.category)
    // const uniqueCategories = [...new Set(categories)]

    // Filter posts by category
    const categoryPosts = posts.filter(
        (post) => post.frontmatter.category.toLowerCase() === category_name
    )

    return {
        props: {
            posts: categoryPosts,
            categoryName: category_name,
            // categories: uniqueCategories,
        },
    }
}
