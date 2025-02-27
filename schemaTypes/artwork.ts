import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'creationDate',
      title: 'Creation Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'medium',
      title: 'Medium/Materials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'medium'}]}],
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    }),
    defineField({
      name: 'creators',
      title: 'Creator(s)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'project',
      title: 'Parent Project',
      type: 'reference',
      to: [{type: 'project'}],
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
    }),
    defineField({
      name: 'techniques',
      title: 'Techniques',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'technique'}]}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'relatedArtworks',
      title: 'Related Artworks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'artwork'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      creator0: 'creators.0.name',
      media: 'images.0',
    },
    prepare(selection) {
      const {title, creator0, media} = selection
      return {
        title,
        subtitle: creator0 ? `by ${creator0}` : '',
        media,
      }
    },
  },
}) 