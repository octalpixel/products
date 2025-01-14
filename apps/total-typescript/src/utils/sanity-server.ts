import sanityClient from '@sanity/client'

export const sanityWriteClient = sanityClient({
  projectId: 'z9io1e0u',
  dataset: 'production',
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2021-10-19',
  token: process.env.SANITY_API_TOKEN,
})
