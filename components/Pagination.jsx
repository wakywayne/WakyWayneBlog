import React from 'react'
import Link from "next/link"
import { lime } from 'tailwindcss/colors';


export default function Pagination({ currentPage, numPages }) {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = `/blog/page/${currentPage - 1}`;
    const nextPage = `/blog/page/${currentPage + 1}`;

    // Definitely should add this to hacks

    if (numPages === 1) return null;

    return (
        <div className=' flex pl-0 list-none my-2'>
            {!isFirst && (
                <Link href={prevPage}>
                    <li className=' relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200
                    text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>Previous</li>
                </Link>

            )}
            {Array.from({ length: numPages }, (_, i) => (
                <Link href={`/blog/page/${i + 1}`} key={`page-${i}`}>
                    <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
                        {i + 1}
                    </li>
                </Link>
            ))}
            {!isLast && (
                <Link href={nextPage}>
                    <li className=' relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200
                    text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>Next</li>
                </Link>

            )}
        </div>
    )
}
