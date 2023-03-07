import React from 'react'
import Layout from '../components/Layout'

export default function NotFoundPage() {
    return (
        <Layout title="Page Not Found">
            <div className='flex flex-col items-center mt-20'>
                <p>Image</p>

                <h1 className=' text-6xl my-5'>Whoops!</h1>

                <h2 className=' text-4xl text-blue-400 mb-5'>
                    Looks like you&apos;ve ventured off the beaten track.
                </h2>
            </div>
        </Layout>
    )
}
