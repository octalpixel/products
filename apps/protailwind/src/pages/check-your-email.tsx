import * as React from 'react'
import Layout from 'components/layout'
import Image from 'next/image'
import toast from 'react-hot-toast'

const CheckYourEmail = () => {
  React.useEffect(() => {
    toast('Check your email', {
      icon: '✉️',
    })
  }, [])

  return (
    <Layout
      footer={null}
      meta={{title: `Check your email`}}
      className="bg-blue-600"
    >
      <main className="relative flex flex-grow flex-col items-center justify-center px-5 pt-5 pb-16 text-white">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5 text-center">
          <h1 className="text-center font-heading text-3xl font-extrabold leading-9 sm:text-4xl lg:text-5xl">
            Check your email
          </h1>
          <p className="max-w-sm text-lg text-blue-50">
            A login link will been sent to your email! Use it and you&apos;ll be
            able to access your account.
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default CheckYourEmail
