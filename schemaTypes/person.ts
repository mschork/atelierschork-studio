import {defineField, defineType} from 'sanity'
import {BsPerson} from 'react-icons/bs'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: BsPerson,
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
    },
    {
      name: 'bio',
      title: 'Biography',
    },
    {
      name: 'contact',
      title: 'Contact Information',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        list: [
          {title: 'Mr.', value: 'Mr.'},
          {title: 'Mrs.', value: 'Mrs.'},
          {title: 'Ms.', value: 'Ms.'},
          {title: 'Dr.', value: 'Dr.'},
          {title: 'Prof.', value: 'Prof.'},
          {title: 'Mx.', value: 'Mx.'},
        ],
      },
      group: 'basic',
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'middleName',
      title: 'Middle Name',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => {
          const firstName = doc.firstName || ''
          const lastName = doc.lastName || ''
          return `${firstName} ${lastName}`.trim()
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'role'}]}],
      group: 'basic',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'basic',
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [{type: 'block'}],
      group: 'bio',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Platform', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
      group: 'contact',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      firstName: 'firstName',
      middleName: 'middleName',
      lastName: 'lastName',
      role0: 'roles.0.title',
      media: 'portrait',
    },
    prepare(selection) {
      const {title, firstName, middleName, lastName, role0, media} = selection
      
      // Format name as: First M. Last
      let formattedName = firstName || ''
      
      // Add middle initial with period if available
      if (middleName && middleName.length > 0) {
        formattedName += ` ${middleName.charAt(0)}.`
      }
      
      // Add last name
      if (lastName) {
        formattedName += ` ${lastName}`
      }
      
      return {
        title: formattedName.trim(),
        subtitle: role0 || '',
        media,
      }
    },
  },
}) 