import React from 'react'
import ExerciseTemplate from 'templates/exercise-template'
import {GetStaticPaths, GetStaticProps} from 'next'
import {getAllTutorials, getTutorial} from 'lib/tutorials'
import {getExercise} from 'lib/exercises'
import path from 'path'
import {walk} from 'utils/code-editor-content'
import {LessonProvider} from '@skillrecordings/skill-lesson/hooks/use-lesson'
import {VideoResourceProvider} from '@skillrecordings/skill-lesson/hooks/use-video-resource'

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context
  const lessonSLug = params?.lesson as string

  const module = await getTutorial(params?.module as string)
  const lesson = await getExercise(lessonSLug)

  const tutorialDirectory = path.join(
    process.cwd(),
    'src/video/exercise/sandpack/parcel',
  )
  const tutorialFiles = walk(tutorialDirectory)

  return {
    props: {
      lesson,
      module,
      tutorialFiles,
      transcript: lesson.transcript,
      videoResourceId: lesson.videoResourceId,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const tutorials = await getAllTutorials()

  const paths = tutorials.reduce((acc: any[], tutorial: any) => {
    return [
      ...acc,
      ...tutorial.lessons.map((exercise: any) => {
        return {
          params: {
            module: tutorial.slug.current,
            lesson: exercise.slug,
          },
        }
      }),
    ]
  }, [])

  return {paths, fallback: 'blocking'}
}

const ExercisePage: React.FC<any> = ({
  lesson,
  module,
  tutorialFiles,
  transcript,
  videoResourceId,
}) => {
  return (
    <LessonProvider lesson={lesson} module={module}>
      <VideoResourceProvider videoResourceId={videoResourceId}>
        <ExerciseTemplate
          transcript={transcript}
          tutorialFiles={tutorialFiles}
        />
      </VideoResourceProvider>
    </LessonProvider>
  )
}

export default ExercisePage
