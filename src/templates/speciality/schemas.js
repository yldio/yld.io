const communitySchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/product.schema.json',
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    communityText: {
      type: 'string'
    },
    communityLogoTitle: {
      type: 'string'
    },
    communityLogoUrl: {
      type: 'string'
    }
  },
  required: ['title', 'communityText']
}

const trainingSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    trainingIntroText: {
      type: 'string'
    }
  },
  required: ['trainingIntroText']
}

const projectsSchema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'array',
  title: 'The Root Schema',
  required: ['items'],
  items: {
    $id: '#/items',
    type: 'object',
    title: 'The Items Schema',
    required: [
      '__typename',
      'title',
      'slug',
      'introSentence',
      'posterColor',
      'posterImage'
    ],
    properties: {
      __typename: {
        $id: '#/items/properties/__typename',
        type: 'string',
        title: 'The __typename Schema',
        default: '',
        examples: ['ContentfulTemplatedCaseStudy'],
        pattern: '^(.*)$'
      },
      title: {
        $id: '#/items/properties/title',
        type: 'string',
        title: 'The Title Schema',
        default: '',
        examples: ['Migrating The Economist platform'],
        pattern: '^(.*)$'
      },
      slug: {
        $id: '#/items/properties/slug',
        type: 'string',
        title: 'The Slug Schema',
        default: '',
        examples: ['the-economist-creating-a-better-reading-experience'],
        pattern: '^(.*)$'
      },
      introSentence: {
        $id: '#/items/properties/introSentence',
        type: 'string',
        title: 'The Introsentence Schema',
        default: '',
        examples: [
          'We created a mobile-first, content-led, better reading experience for global digital users, improving the site architecture while delivering a more flexible solution.'
        ],
        pattern: '^(.*)$'
      },
      posterColor: {
        $id: '#/items/properties/posterColor',
        type: 'string',
        title: 'The Postercolor Schema',
        default: '',
        examples: ['E02A1B'],
        pattern: '^(.*)$'
      },
      posterImage: {
        $id: '#/items/properties/posterImage',
        type: 'object',
        title: 'The Posterimage Schema',
        required: ['title', 'file'],
        properties: {
          title: {
            $id: '#/items/properties/posterImage/properties/title',
            type: 'string',
            title: 'The Title Schema',
            default: '',
            examples: ['The Economist case study featured image '],
            pattern: '^(.*)$'
          },
          file: {
            $id: '#/items/properties/posterImage/properties/file',
            type: 'object',
            title: 'The File Schema',
            required: ['url'],
            properties: {
              url: {
                $id:
                  '#/items/properties/posterImage/properties/file/properties/url',
                type: 'string',
                title: 'The Url Schema',
                default: '',
                examples: [
                  '//images.ctfassets.net/22g1lenhck4z/SYVlouC4GiCMyIESK6ieY/d28fa4457c4d6e8bf6bac6603b2b5bfd/economist_export.svg'
                ],
                pattern: '^(.*)$'
              }
            }
          }
        }
      }
    }
  }
}

const clientSchema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'array',
  title: 'The Root Schema',
  items: {
    $id: '#/items',
    type: 'object',
    title: 'The Items Schema',
    required: ['id', 'title', 'file'],
    properties: {
      id: {
        $id: '#/items/properties/id',
        type: 'string',
        title: 'The Id Schema',
        default: '',
        examples: ['4084b31a-9b20-5e7b-ba23-8ec4a71e32ff'],
        pattern: '^(.*)$'
      },
      title: {
        $id: '#/items/properties/title',
        type: 'string',
        title: 'The Title Schema',
        default: '',
        examples: ['conde nast logo'],
        pattern: '^(.*)$'
      },
      file: {
        $id: '#/items/properties/file',
        type: 'object',
        title: 'The File Schema',
        required: ['url', 'fileName'],
        properties: {
          url: {
            $id: '#/items/properties/file/properties/url',
            type: 'string',
            title: 'The Url Schema',
            default: '',
            examples: [
              '//images.ctfassets.net/22g1lenhck4z/5QAIwaWizKc6Eq64uckG4a/db1b0b78464e82588cccb52a2a98528d/conde_nast.png'
            ],
            pattern: '^(.*)$'
          },
          fileName: {
            $id: '#/items/properties/file/properties/fileName',
            type: 'string',
            title: 'The Filename Schema',
            default: '',
            examples: ['conde_nast.png'],
            pattern: '^(.*)$'
          }
        }
      }
    }
  }
}

export { communitySchema, projectsSchema, clientSchema, trainingSchema }
