
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className='bg-gray-600 text-gray-100 shadow w-full'>
            <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
                <Link href='/'>
                    <a className='flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0'>
                        {/* <Image src='/../public/myfavicon.ico' width={40} height={40} alt='logo' /> */}
                        <span className='ml-3 text-xl'>Home</span>
                    </a>
                </Link>
                <nav className='flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto'>
                    <Link href='/blog'>
                        <a className='mx-5 cursor-pointer uppercase hover:text-red-400'>
                            Blog
                        </a>
                    </Link>
                    <Link href='/about'>
                        <a className='mx-5 cursor-pointer uppercase hover:text-red-400'>
                            About
                        </a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}