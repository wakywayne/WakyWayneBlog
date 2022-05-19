import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { sortByDate } from "@/utils/index"


// Learn what this is doing:
const files = fs.readdirSync(path.join("posts"));
const projects = fs.readdirSync(path.join("projects"));

export function getPosts() {
    const posts = files.map(filename => {
        const slug = filename.replace('.md', '');

        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf8');

        const { data: frontmatter } = matter(markdownWithMeta);


        return { slug, frontmatter };
    });
    return posts.sort(sortByDate);
}

export function getProjects() {
    const posts = projects.map(filename => {
        const slug = filename.replace('.md', '');

        const markdownWithMeta = fs.readFileSync(path.join('projects', filename), 'utf8');

        const { data: frontmatter } = matter(markdownWithMeta);


        return { slug, frontmatter };
    });
    return posts.sort(sortByDate);
}