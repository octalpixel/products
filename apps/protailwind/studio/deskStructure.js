import S from '@sanity/desk-tool/structure-builder'
import articles from './src/structure/articles'
import tips from './src/structure/tips'
import videoResources from './src/structure/videoResources'
import tutorials from './src/structure/tutorials'
import workshops from './src/structure/workshops'
import bundles from './src/structure/bundles'

const hiddenDocTypes = (listItem) =>
  ![
    'article',
    'tip',
    'videoResource',
    'skosConcept',
    'skosConceptScheme',
    'module',
    'testimonial',
    'section',
    'explainer',
    'bundles',
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Pro Tailwind')
    .items([
      workshops,
      tutorials,
      tips,
      articles,
      S.divider(),
      videoResources,
      S.divider(),
      bundles,
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.documentTypeListItem('skosConcept').title('Concepts'),
      S.documentTypeListItem('skosConceptScheme').title('Taxonomy Schemes'),
    ])
