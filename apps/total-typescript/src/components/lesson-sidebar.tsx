import React from 'react'
import {SanityDocument} from '@sanity/client'
import Link from 'next/link'
import LessonNavigator from './lesson-navigator'
import cx from 'classnames'
import SimpleBar from 'simplebar-react'

type SidebarProps = {
  module: SanityDocument
  path: string
  className?: string
}
const LessonSidebar: React.FC<SidebarProps> = ({
  module,
  path = '',
  className,
}) => {
  return (
    <>
      <div
        className="bg-slate-900 lg:max-w-xs w-full border-r border-gray-800"
        aria-hidden="true"
      />
      <nav
        className={cx(
          'bg-slate-900 lg:max-w-xs lg:fixed  w-full top-0 border-r border-gray-800 lg:border-b border-b',
          className,
        )}
      >
        <SimpleBar className="relative lg:max-h-screen max-h-[580px] lg:pb-16">
          <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg">
            <div className="flex items-center gap-5 px-3 lg:pt-16 pt-2 pb-2 bg-blue-600">
              {module?.image && <img src={module.image} className="w-20" />}
              <div>
                <Link href="/tutorials">
                  <a className="uppercase text-sm font-semibold opacity-80 hover:underline">
                    {module.moduleType}s<span className="pl-1">/</span>
                  </a>
                </Link>
                <h1 className="text-2xl font-bold leading-tight font-text">
                  <Link
                    href={{
                      pathname: `${path}/[module]`,
                      query: {module: module.slug},
                    }}
                    passHref
                  >
                    <a className="hover:underline">{module.title}</a>
                  </Link>
                </h1>
              </div>
            </div>
            <h3 className="pt-5 pb-2 text-sm opacity-80 font-semibold uppercase px-5">
              Lessons
            </h3>
          </div>
          <LessonNavigator module={module} path={path} />
        </SimpleBar>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent h-24 z-20 pointer-events-none" />
      </nav>
    </>
  )
}

export default LessonSidebar