import {sanityClient} from '@skillrecordings/skill-lesson/utils/sanity-client'
import groq from 'groq'
import z from 'zod'
import {BaseLessonResourceSchema} from '@skillrecordings/skill-lesson/schemas/base-lesson-resource'

export const ExerciseSchema = z
  .object({
    _id: z.string().optional(),
    _key: z.string().optional(),
    sandpack: z
      .array(
        z.object({
          file: z.string().optional(),
          code: z.string().optional(),
          active: z.boolean().optional(),
        }),
      )
      .optional()
      .nullable(),
    videoResourceId: z.nullable(z.string()).optional(),
    transcript: z.nullable(z.any().array()).optional(),
    figma: z
      .object({
        url: z.string(),
      })
      .optional()
      .nullable(),
    github: z
      .object({
        url: z.string(),
      })
      .optional()
      .nullable(),
    solution: z
      .object({
        _key: z.string(),
        videoResourceId: z.nullable(z.string()).optional(),
        transcript: z.nullable(z.any().array()).optional(),
        github: z
          .object({
            url: z.string(),
          })
          .optional()
          .nullable(),
      })
      .merge(BaseLessonResourceSchema)
      .optional()
      .nullable(),
  })
  .merge(BaseLessonResourceSchema)

export type Exercise = z.infer<typeof ExerciseSchema>

export const getExercise = async (slug: string): Promise<Exercise> => {
  const query = groq`*[_type in ["exercise", "explainer"] && slug.current == $slug][0]{
      _id,
      _type,
      _updatedAt,
      title,
      description,
      "slug": slug.current,
       body[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "_id": @.reference->_id,
            "slug": @.reference->slug.current,
            "type": @.reference->_type,
            "module": *[_type=='module'][0]{
              "slug": slug.current,
            }
          }
        }
      },
      "sandpack": resources[@._type == 'sandpack'][0].files[]{
          file,
          "code": code.code,
          active
      },
      "videoResourceId": resources[@->._type == 'videoResource'][0]->_id,
      "transcript": resources[@->._type == 'videoResource'][0]-> castingwords.transcript,
      "figma": resources[@._type == 'figma'][0] {
        url
      },
      "github": resources[@._type == 'github'][0] {
        url
      },
      "solution": resources[@._type == 'solution'][0]{
        _key,
        _type,
        "_updatedAt": ^._updatedAt,
        title,
        description,
        "videoResourceId": resources[@->._type == 'videoResource'][0]->_id,
        body,
        "transcript": resources[@->._type == 'videoResource'][0]-> castingwords.transcript,
        "github": resources[@._type == 'github'][0] {
          url
        },
        "slug": slug.current,
      }
    }`

  const exercise = await sanityClient.fetch(query, {slug: `${slug}`})

  return ExerciseSchema.parse(exercise)
}

export const getAllExercises = async (): Promise<Exercise[]> => {
  const lessons =
    await sanityClient.fetch(groq`*[_type in ["exercise", "explainer"]]{
      _id,
      _type,
      _updatedAt,
      title,
      description,
      body,
      "slug": slug.current,
      "stackblitz": resources[@._type == 'stackblitz'][0].openFile,
      "videoResourceId": resources[@->._type == 'videoResource'][0]->_id,
      "solution": resources[@._type == 'solution'][0]{
        _key,
        _type,
        _updatedAt,
        title,
        description,
        body,
        "stackblitz": resources[@._type == 'stackblitz'][0].openFile,
        "videoResourceId": resources[@->._type == 'videoResource'][0]->_id,
        "github": resources[@._type == 'github'][0] {
          url 
        },
       "slug": slug.current
       }
    }`)

  return z.array(ExerciseSchema).parse(lessons)
}
