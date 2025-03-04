// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
// —— documents
import cta from './documents/cta'
import exercise from './documents/exercise'
import explainer from './documents/explainer'
import section from './documents/section'
import module from './documents/module'
import videoResource from './documents/videoResource'
import linkResource from './documents/linkResource'
import tip from './documents/tip'
import testimonial from './documents/testimonial'
import pricing from './documents/pricing'
import product from './documents/product'
import article from './documents/article'
// —— objects
// body
import body from './objects/body'
import bodyVideo from './objects/bodyVideo'
import bodyImage from './objects/bodyImage'
import callout from './objects/callout'
import divider from './objects/divider'
import externalImage from './objects/externalImage'
import mediaCaption from './objects/mediaCaption'
import muxVideo from './objects/resources/muxVideo'
import videoOptions from './objects/videoOptions'
import grid from './objects/grid'
import gridItem from './objects/gridItem'
import stackblitz from './objects/stackblitz'
import solution from './objects/resources/solution'
import github from './objects/github'
import muxAsset from './objects/muxAsset'
import castingwordsTranscript from './objects/castingwordsTranscript'
import tweet from './objects/tweet'
import bodyTestimonial from './objects/bodyTestimonial'
import feature from './objects/feature'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // documents
    cta,
    module,
    exercise,
    explainer,
    videoResource,
    linkResource,
    tip,
    testimonial,
    section,
    pricing,
    product,
    article,
    // objects
    body,
    bodyVideo,
    bodyImage,
    callout,
    divider,
    externalImage,
    mediaCaption,
    muxVideo,
    videoOptions,
    grid,
    gridItem,
    stackblitz,
    github,
    solution,
    muxAsset,
    castingwordsTranscript,
    tweet,
    bodyTestimonial,
    feature,
  ]),
})
