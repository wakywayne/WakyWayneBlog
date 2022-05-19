import Layout from "@/components/Layout"
import Project from "@/components/Project"
import Link from "next/link"
import { getProjects } from "@/lib/posts"

export default function Home({ projects }) {

  return (
    <Layout>
      <h1 className=" text-5xl border-b-4 mb-2 p-5 font-bold">Projects I&apos;ve worked on</h1>

      <div className=" grid md:grid-col-2 lg:grid-cols-3 gap-5">
        {projects.map((post) => (
          <Project key={post.id} post={post} />
        ))}
      </div>
      <Link href='/blog'>
        <a className='block text-center border border-blue-500 text-blue-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-green-700 focus:outline-none focus:shadow-outline w-full'>
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