---
title: 'Build a site with markdown'
date: 'September, 14, 2022'
excerpt: 'This will show you the basics of what I used to make this website'
cover_image: '/images/posts/img7.jpg'
category: 'Utilities'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Using Gray-Matter
*Like I do on this site!*
**Gray matter allows you to destructor frontmatter**

## this is what front matter looks like
*It basically allows you to use props in your MD files*

```
---
title: 'Django Crash Course'
date: 'May 5, 2021'
excerpt: 'Django is a very powerful, high level Python framework for building web applications'
cover_image: '/images/posts/img3.jpg'
category: 'Database'
author: 'Sam Smith'
author_image: 'https://randomuser.me/api/portraits/men/12.jpg'
---
```

1. Import matter from gray-matter
2. Get Paths *If needed* 
3. Pull your frontmatter

```javascript
        export async function getStaticPaths() {
            const files = fs.readdirSync(path.join('projects'));

            const paths = files.map(filename => {
                const slug = filename.replace('.md', '');

                return { params: { slug } };
            });

            return {
                paths,
                fallback: false
                // fallback: false means, If they try and got to a path that doesn't they will get the 404 page
            }
        }

        // Somehow git pilot auto generated this perfectly incredible...

        export async function getStaticProps({ params }) {
            const slug = params.slug;

            const markdownWithMeta = fs.readFileSync(path.join('projects', `${slug}.md`), 'utf8');

            const { data: frontmatter, content } = matter(markdownWithMeta);

            return {
                props: {
                    frontmatter,
                    content,
                    slug
                },
            }
        }
```

4. Use your frontmatter on the front end
    - Below I show you marked which is a markdown parser [npm page for marked](https://www.npmjs.com/package/marked)

```javascript
        import { marked } from 'marked'

        <article className='mt-2'>
            <div dangerouslySetInnerHTML={{ __html: marked(content) }><div>
        </article>
```

```javascript
        export default function PostPage({ frontmatter: { title, category, date, cover_image, author, author_image }, content, slug }) {
        
        
        
            return (
                <Layout title={title}>
                    <Link href='/'>Go Back</Link>
                    <div className='w-full px-10 py-6 mt-6 bg-white rounded-lg shadow-md '>
                        <div className='flex items-center justify-between mt-4 '>
                            <h1 className='text-5xl mb-7' >
                                {title}
                            </h1>
                            {/* <CategoryLabel>{category}</CategoryLabel> */}
                        </div>
                        <img src={cover_image} alt="" className='w-full rounded ' />
        
                        <div className='flex items-center justify-between p-2 my-8 bg-blue-100'>
                            <div className='flex items-center'>
                                <img
                                    src={author_image}
                                    alt=''
                                    className='hidden object-cover w-10 h-10 mx-4 rounded-full sm:block'
                                />
                                <h4>{author}</h4>
                            </div>
                            <div className='mr-4'>{date}</div>
                        </div>
        
                        <article className='mt-2'>
                            <div className="prose " dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                        </article>
                    </div>
                </Layout>
            )
        }
```

