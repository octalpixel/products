import groq from 'groq'
import {sanityClient} from '@skillrecordings/skill-lesson/utils/sanity-client'

const tutorialsQuery = groq`*[_type == "module" && moduleType == 'tutorial' && state == 'published'] | order(_createdAt desc) {
  _id,
  _type,
  title,
  slug,
  "image": image.asset->url,
  _updatedAt,
  _createdAt,
  description,
  "lessons": resources[@->._type in ['exercise', 'explainer']]->{
    _id,
    _type,
    _updatedAt,
    title,
    description,
    "slug": slug.current,
    "solution": resources[@._type == 'solution'][0]{
      _key,
      _type,
      "_updatedAt": ^._updatedAt,
      title,
      description,
      "slug": slug.current,
    },
    }
}`

export const getAllTutorials = async () =>
  await sanityClient.fetch(tutorialsQuery)

export const getTutorial = async (slug: string) =>
  await sanityClient.fetch(
    groq`*[_type == "module" && moduleType == 'tutorial' && slug.current == $slug][0]{
        "id": _id,
        _type,
        title,
        state,
        slug,
        body[]{
          ...,
          _type == "bodyTestimonial" => {
            "body": testimonial->body,
            "author": testimonial->author {
              "image": image.asset->url,
              name
            }
        }
        },
        moduleType,
        _id,
        github,
        ogImage,
        description,
        _updatedAt,
        "lessons": resources[@->._type in ['exercise', 'explainer']]->{
          _id,
          _type,
          _updatedAt,
          title,
          description,
          "slug": slug.current,
          "solution": resources[@._type == 'solution'][0]{
            _key,
            _type,
            "_updatedAt": ^._updatedAt,
            title,
            description,
            "slug": slug.current,
          }
        },
        "image": image.asset->url
    }`,
    {slug: `${slug}`},
  )
