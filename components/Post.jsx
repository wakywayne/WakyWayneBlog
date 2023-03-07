/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CategoryLabel from './CategoryLabel'

export default function Post({ post }) {


    return (
        <div className='w-full px-10 py-6 mt-6 bg-white rounded-lg shadow-md '>
            <Image
                src={`${post.frontmatter.cover_image ? post.frontmatter.cover_image : '/images/default.jpg'}`}
                alt={post.frontmatter.title}
                height={420}
                width={600}
                className='mb-4 rounded'
            />
            <div className="flex items-center justify-between">
                <span className="font-normal text-green-600 ">{post.frontmatter.date}</span>

                <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
            </div>

            <div className="mt-2">
                <Link href={`/blog/${post.slug}`}>
                    <a className="text-2xl font-bold text-blue-900 underline md:no-underline">{post.frontmatter.title}</a>
                </Link>
                <p className="mt-2 text-black-900">
                    {post.frontmatter.excerpt}
                </p>
            </div>

            <div className="flex items-center justify-between">
                <Link href={`/blog/${post.slug}`}>
                    <a className="mt-3 text-blue-700 hover:text-blue-700 hover:underline" >Read More</a>
                </Link>

                <div className="flex items-center">
                    <img src={`${post.frontmatter.author_image ? post.frontmatter.author_image : '/images/default2.jpg'}`} className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" />
                    <h3 className="font-bold text-blue-700">
                        {post.frontmatter.author}
                    </h3>
                </div>

            </div>
        </div>
    )
}
