import React from 'react'
import Layout from '@/components/Layout'

export default function about() {
    return (
        <Layout title="About Page">
            <h1 className=' text-5xl border-b-4 pb-5 font-bold'>About</h1>

            <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
                <h3 className=' text-2xl mb-5'>
                    Waky Wayne&apos;s Blog
                </h3>
                <p className='mb-3'>
                    This is a blog created in next.js and markdown.
                </p>

                <span>
                    <p className="font-bold">Version 1.0.0</p>
                </span>
            </div>
        </Layout>
    )
}