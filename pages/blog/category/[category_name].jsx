import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import CategoryLists from '@/components/CategoryLists'
import matter from 'gray-matter'
import { getPosts } from '@/lib/posts'

export default function CategoryBlogPage({ posts, categoryName, categories }) {
    return (
        <Layout>
            <div className='flex justify-between'>
                <div className='w-3/4 mr-10'>
                    <h1 className='p-5 text-5xl font-bold border-b-4'>
                        Posts in {categoryName}
                    </h1>

                    <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
                        {posts.map((post, index) => (
                            <Post key={index} post={post} />
                        ))}
                    </div>
                </div>

                <div className='hidden md:inline-block md:w-1/4 '>
                    <CategoryLists categories={categories} />
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const categories = files.map((filename) => {
        const markdownWithMeta = fs.readFileSync(
            path.join('posts', filename),
            'utf-8'
        )

        const { data: frontmatter } = matter(markdownWithMeta)

        return frontmatter.category.toLowerCase()
    })

    const paths = categories.map((category) => ({
        params: { category_name: category },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { category_name } }) {
    const files = fs.readdirSync(path.join('posts'))

    const posts = getPosts()

    // Get categories for sidebar
    const categories = posts.map((post) => post.frontmatter.category)
    const uniqueCategories = [...new Set(categories)]

    // Filter posts by category
    const categoryPosts = posts.filter(
        (post) => post.frontmatter.category.toLowerCase() === category_name
    )

    return {
        props: {
            posts: categoryPosts,
            categoryName: category_name,
            categories: uniqueCategories,
        },
    }
}