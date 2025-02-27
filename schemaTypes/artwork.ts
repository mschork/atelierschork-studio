import {defineField, defineType} from 'sanity'
import {BsPalette} from 'react-icons/bs'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: BsPalette,
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
    },
    {
      name: 'details',
      title: 'Artwork Details',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'location',
      title: 'Location',
    },
    {
      name: 'classification',
      title: 'Classification',
    },
    {
      name: 'related',
      title: 'Related Content',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'basic',
    }),
    defineField({
      name: 'creators',
      title: 'Creator(s)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'creationDate',
      title: 'Creation Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      group: 'details',
    }),
    defineField({
      name: 'medium',
      title: 'Medium/Materials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'medium'}]}],
      group: 'details',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'techniques',
      title: 'Techniques',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'technique'}]}],
      group: 'details',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      group: 'media',
    }),
    defineField({
      name: 'currentLocation',
      title: 'Current Location',
      type: 'object',
      fields: [
        {
          name: 'locationType',
          title: 'Location Type',
          type: 'string',
          options: {
            list: [
              {title: 'Institution', value: 'institution'},
              {title: 'Private Collection', value: 'privateCollection'},
              {title: 'Artist Collection', value: 'artistCollection'},
            ],
          },
        },
        {
          name: 'location',
          title: 'Location',
          type: 'reference',
          to: [{type: 'location'}],
          hidden: ({parent}) => parent?.locationType === 'privateCollection' || parent?.locationType === 'artistCollection',
        },
      ],
      group: 'location',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      group: 'classification',
    }),
    defineField({
      name: 'project',
      title: 'Parent Project',
      type: 'reference',
      to: [{type: 'project'}],
      group: 'related',
    }),
    defineField({
      name: 'relatedArtworks',
      title: 'Related Artworks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'artwork'}]}],
      group: 'related',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      creator0: 'creators.0.firstName',
      creatorLast0: 'creators.0.lastName',
      creatorRole0: 'creators.0.roles.0.title',
      media: 'images.0',
    },
    prepare(selection) {
      const {title, creator0, creatorLast0, creatorRole0, media} = selection
      const creatorName = creator0 && creatorLast0 ? `${creator0} ${creatorLast0}` : creator0 || creatorLast0 || ''
      const subtitle = creatorName ? `by ${creatorName}${creatorRole0 ? ` (${creatorRole0})` : ''}` : ''
      
      return {
        title,
        subtitle,
        media,
      }
    },
  },
}) 