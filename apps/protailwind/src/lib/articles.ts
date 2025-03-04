import {sanityClient} from '@skillrecordings/skill-lesson/utils/sanity-client'
import groq from 'groq'
import z from 'zod'

export const ArticleSchema = z.object({
  title: z.string(),
  metaTitle: z.string().optional(),
  subtitle: z.string().optional(),
  slug: z.string(),
  description: z.nullable(z.string()).optional(),
  body: z.any().array(),
  date: z.string(),
  related: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      slug: z.string(),
    })
    .array(),
  ogImage: z.object({
    url: z.string(),
  }),
  estimatedReadingTime: z.string(),
})

export type Article = z.infer<typeof ArticleSchema>

export async function getAllArticles() {
  return await sanityClient.fetch(groq`*[_type == "article" && published == true] | order(date asc){
    _updatedAt,
    title,
    subtitle,
    'slug': slug.current,
    description,
    body,
    published,
    image,
    date,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
}`)
}

export async function getArticle(slug: string) {
  return await sanityClient.fetch(
    groq`*[_type == "article" && slug.current == $slug][0]{
    title,
    subtitle,
    "slug": slug.current,
    body,
    metaTitle,
    date,
    description,
    related[]->{
      title,
      subtitle,
      'slug': slug.current
    },
    ogImage{
      url
    },
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }`,
    {
      slug,
    },
  )
}
