/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CategoryLabel from './CategoryLabel'

export default function Post({ post }) {


    return (
        <div className=' w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
            <Image
                src={`/../public${post.frontmatter.cover_image}`}
                alt={post.frontmatter.title}
                height={420}
                width={600}
                className='mb-4 rounded'
            />
            <div className="flex justify-between items-center">
                <span className="font-light text-gray-700">{post.frontmatter.date}</span>

                <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
            </div>

            <div className="mt-2">
                <Link href={`/blog/${post.slug}`}>
                    <a className="text-2xl font-bold text-gray-900 hover:underline sm:underline md:no-underline">{post.frontmatter.title}</a>
                </Link>
                <p className="mt-2 text-gray-600">
                    {post.frontmatter.excerpt}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <Link href={`/blog/${post.slug}`}>
                    <a className="text-gray-700 hover:text-blue-700 hover:underline mt-3" >Read More</a>
                </Link>

                <div className="felx items-center">
                    {/* <img src={`${post.frontmatter.author_image}`} className=" mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" /> */}
                    <h3 className="text-gray-700 font-bold">
                        {post.frontmatter.author}
                    </h3>
                </div>

            </div>
        </div>
    )
}
