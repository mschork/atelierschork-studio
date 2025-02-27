import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'exhibition',
  title: 'Exhibition',
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
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'curators',
      title: 'Curator(s)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
    defineField({
      name: 'featuredArtworks',
      title: 'Featured Artworks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'artwork'}]}],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
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
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
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
      name: 'press',
      title: 'Press/Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'publication',
              title: 'Publication',
              type: 'string',
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'excerpt',
              title: 'Excerpt',
              type: 'text',
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location.name',
      startDate: 'startDate',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, location, startDate, media} = selection
      const date = startDate ? new Date(startDate).getFullYear() : ''
      return {
        title,
        subtitle: location && date ? `${location}, ${date}` : location || date,
        media,
      }
    },
  },
}) 