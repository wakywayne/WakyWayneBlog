/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CategoryLabel from './CategoryLabel'


export default function Post({ post }) {


    return (
        <div className='w-full px-10 py-6 mt-6 bg-white rounded-lg shadow-md '>
            <Image
                src={`${post.frontmatter.cover_image}`}
                alt={post.frontmatter.title}
                height={420}
                width={600}
                className='mb-4 rounded'
            />
            <div className="flex items-center justify-between">
                <span className="font-normal text-green-600">{post.frontmatter.date}</span>

                <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
            </div>

            <div className="mt-2">
                <div className='flex flex-col'>
                    <h2 className="text-2xl font-bold text-blue-900 ">{post.frontmatter.title}</h2>
                    <Link href={`/blog/project/${post.slug}`}>
                        <small className="px-2 py-1 m-2 bg-green-600 rounded hover:cursor-pointer w-max hover:ring-2 focus:ring-blue-600">View Details</small>
                    </Link>
                </div>

                <p className="mt-2 text-blue-600">
                    {post.frontmatter.excerpt}
                </p>
            </div>

            <br />
            <div className="flex items-center justify-between">
                <div className="flex flex-col ">
                    {/* <img src={`${post.frontmatter.author_image}`} className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" /> */}
                    <h4 className='text-gray-500 underline'>Made for:</h4>
                    <h3 className="font-bold text-blue-700">
                        {post.frontmatter.author}
                    </h3>
                </div>

            </div>
        </div>
    )
}
