import React from 'react'
import Link from 'next/link'

export default function CategoryLabel({ children }) {


    const colorKey = {
        Database: 'green',
        Backend: 'purple',
        Frameworks: 'blue',
        Frontend: 'red',
    }

    const bgColor = `bg-${colorKey[children]}-600`;

    // IMPORTANT you must add a safe list to the tailwingconfig for this to work

    return (
        <div className={` px-2 py-1 font-bold rounded ${bgColor}`}>
            <Link href={`/blog/category/${children.toLowerCase()}`}>
                {children}
            </Link>
        </div>
    )
}
