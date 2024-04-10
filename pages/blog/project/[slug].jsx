/* eslint-disable @next/next/no-img-element */
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Layout from "@/components/Layout";
import Link from "next/link";
// import CategoryLabel from '@/components/CategoryLabel'

export default function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) {
  return (
    <Layout title={title}>
      <Link href="/">Go Back</Link>
      <div className="w-full px-10 py-6 mt-6 bg-white rounded-lg shadow-md ">
        <div className="flex items-center justify-between mt-4 ">
          <h1 className="text-5xl mb-7">{title}</h1>
          {/* <CategoryLabel>{category}</CategoryLabel> */}
        </div>
        <img src={cover_image} alt="" className="w-full rounded " />

        <div className="flex items-center justify-between p-2 my-8 bg-blue-100">
          <div className="flex items-center">
            <img
              src={author_image}
              alt=""
              className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>

        <article className="mt-2">
          <div
            className="prose "
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        </article>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("projects"));

  const paths = files.map((filename) => {
    const slug = filename.replace(".md", "");

    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
    // fallback: false means, If they try and got to a path that doesn't they will get the 404 page
  };
}

// Somehow git pilot auto generated this perfectly incredible...

export async function getStaticProps({ params }) {
  const slug = params.slug;

  const markdownWithMeta = fs.readFileSync(
    path.join("projects", `${slug}.md`),
    "utf8",
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
