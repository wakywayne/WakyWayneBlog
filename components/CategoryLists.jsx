import Link from 'next/link'
import React from 'react'

export default function CategoryLists({ categories }) {
    return (
        <div className='w-full p-5 mt-6 bg-white rounded-lg shadow-md '>
            <h3 className='p-3 text-white bg-green-600 rounded text-1xl lg:text-2xl'>Categories</h3>
            <ul className="divide-y divide-blue-300">
                {categories.map((category, index) => (
                    <Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
                        <li className="p-4 cursor-pointer hover:bg-green-50">
                            {category}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
