import Link from 'next/link'

export default function CategoryListsMobile({ categories }) {

    const colorKey = {
        Database: 'green',
        UsefulTips: 'purple',
        Styles: 'blue',
        ServerSide: 'gray',
        ClientSide: 'orange',
        Utilities: 'red',
        FrameWorks: 'yellow',
    }


    return (
        <div className='w-full p-5 mt-6 divide-y-4 divide-white bg-white border-solid border-1 border-black rounded-lg shadow-md '>
            <h3 className='p-3 bg-yellow-400 text-black rounded text-1xl lg:text-2xl'>Categories</h3>
            <div className=" grid grid-cols-2 gap-1">
                {categories.map((category, index) => {
                    let bgColor = `border-${colorKey[category]}-600`;
                    return (<Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
                        <div className={`p-4 cursor-pointer px-2 py-1 rounded m-1 border-2 shadow-sm ${bgColor}`}>
                            <p>
                                {category}
                            </p>
                        </div>

                    </Link>)
                })}
            </div>
        </div>
    )
}
