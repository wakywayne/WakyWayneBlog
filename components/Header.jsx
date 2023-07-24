
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className='w-full text-blue-100 bg-blue-600 shadow'>
            <div className='container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row'>

                <Link href='/'>
                    <a className='flex items-center mb-4 font-medium md:w-1/5 title-font md:justify-start md:mb-0'>
                        {/* <Image src='/../public/myfavicon.ico' width={40} height={40} alt='logo' /> */}
                        <span className='ml-3 text-xl hover:text-green-500'>Home</span>
                    </a>
                </Link>
                <h3 className='self-stretch mb-4 mt-3 text-xl font-medium text-black title-font md:mb-0 text-center order-1 md:order-none'>
                    {/* <Image src='/../public/myfavicon.ico' width={40} height={40} alt='logo' /> */}
                    WayneCarl Barker&apos;s Portfolio/ Blog
                </h3>
                <nav className='flex flex-wrap items-center justify-end text-base md:w-4/5 md:ml-auto'>
                    <Link href='/blog'>
                        <a className='mx-5 uppercase cursor-pointer hover:text-green-400'>
                            Blog
                        </a>
                    </Link>
                    <Link href='/about'>
                        <a className='mx-5 uppercase cursor-pointer hover:text-green-400'>
                            About
                        </a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
