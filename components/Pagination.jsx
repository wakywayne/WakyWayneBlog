import React from 'react'
import Link from "next/link"


export default function Pagination({ currentPage, numPages }) {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = `/blog/page/${currentPage - 1}`;
    const nextPage = `/blog/page/${currentPage + 1}`;

    // Definitely should add this to hacks

    if (numPages === 1) return null;

    return (
        <div className='flex pl-0 my-2 list-none '>
            {!isFirst && (
                <Link href={prevPage}>
                    <li className='relative block px-3 py-2 mr-1 leading-tight text-blue-800 bg-white border border-blue-300 cursor-pointer hover:bg-green-200'>Previous</li>
                </Link>

            )}
            {Array.from({ length: numPages }, (_, i) => {
                if (i === 0 || i === numPages - 1 || i === currentPage - 1 || i === currentPage || i === currentPage + 1) {
                    return (
                        <Link href={`/blog/page/${i + 1}`} key={`page-${i}`}>
                            <li className='relative block px-3 py-2 mr-1 leading-tight text-blue-800 bg-white border border-blue-300 cursor-pointer hover:bg-green-200'>
                                {i + 1}
                            </li>
                        </Link>
                    )
                }
            })}
            {!isLast && (
                <Link href={nextPage}>
                    <li className='relative block px-3 py-2 mr-1 leading-tight text-blue-800 bg-white border border-blue-300 cursor-pointer hover:bg-green-200'>Next</li>
                </Link>

            )}
        </div>
    )
}
