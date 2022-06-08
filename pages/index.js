import Layout from "@/components/Layout"
import Project from "@/components/Project"
import Link from "next/link"
import { getProjects } from "@/lib/posts"

export default function Home({ projects }) {

  return (
    <Layout>
      <h1 className="p-5 mb-2 text-5xl font-bold border-b-4 ">Projects I&apos;ve Completed</h1>

      <div className="grid gap-5  md:grid-col-2 lg:grid-cols-3">
        {projects.map((post) => (
          <Project key={post.id} post={post} />
        ))}
      </div>
      <Link href='/blog'>
        <a className='block w-full py-4 my-5 text-center text-blue-800 transition duration-500 border border-blue-500 rounded-md select-none ease hover:text-white hover:bg-green-700 focus:outline-none focus:shadow-outline'>
          Blog articles that I find useful
        </a>
      </Link>
    </Layout>
  )
}

export async function getStaticProps() {

  return {
    props: {
      projects: getProjects(),
    },
  }
}