# Implementation Guide for Atelier Schork Content Model

**Version**: 1.0
**Date**: 2025-11-05

This guide provides technical details for implementing the Atelier Schork content model in Sanity CMS.

---

## Prerequisites

- Sanity CLI installed (`npm install -g @sanity/cli`)
- Node.js 16+ installed
- Sanity account created
- Basic understanding of Sanity Studio

---

## Project Setup

### 1. Initialize Sanity Project

```bash
# Create new Sanity project
sanity init

# Follow prompts:
# - Project name: Atelier Schork
# - Dataset: production
# - Schema: Clean project with no predefined schema
```

### 2. Install Dependencies

```bash
npm install @sanity/vision @sanity/icons
npm install @portabletext/react  # For rendering portable text
```

### 3. Project Structure

```
atelierschork-sanity/
├── schemas/
│   ├── index.ts                 # Schema exports
│   ├── documents/
│   │   ├── artist.ts
│   │   ├── artwork.ts
│   │   ├── collection.ts
│   │   ├── exhibition.ts
│   │   ├── award.ts
│   │   ├── mediaType.ts
│   │   └── siteSettings.ts
│   └── objects/
│       ├── dimensions.ts
│       ├── duration.ts
│       ├── credit.ts
│       ├── education.ts
│       ├── personalProject.ts
│       ├── mediaItem.ts
│       └── socialMedia.ts
├── sanity.config.ts
├── sanity.cli.ts
└── package.json
```

---

## Schema Implementation Examples

### Artist Schema (schemas/documents/artist.ts)

```typescript
import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Primary Role',
      type: 'string',
      description: 'e.g., "Artist & Filmmaker"',
    }),
    defineField({
      name: 'isCoreArtist',
      title: 'Core Artist',
      type: 'boolean',
      description: 'Check if this is Francisco or Markus',
      initialValue: false,
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'statement',
      title: 'Artist Statement',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'birthYear',
      title: 'Birth Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'birthPlace',
      title: 'Birth Place',
      type: 'string',
    }),
    defineField({
      name: 'currentLocation',
      title: 'Current Location',
      type: 'string',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{ type: 'education' }],
    }),
    defineField({
      name: 'cv',
      title: 'CV (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'personalProjects',
      title: 'Personal Projects',
      type: 'array',
      of: [{ type: 'personalProject' }],
      description: 'Non-artistic work or projects',
    }),
    defineField({
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'website',
      title: 'Personal Website',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'socialMedia',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show on website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
      isCoreArtist: 'isCoreArtist',
    },
    prepare({ title, subtitle, media, isCoreArtist }) {
      return {
        title,
        subtitle: isCoreArtist ? `${subtitle} (Core)` : subtitle,
        media,
      }
    },
  },
})
```

### Artwork Schema (schemas/documents/artwork.ts)

```typescript
import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: ImageIcon,
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
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'mediaTypes',
      title: 'Media Types',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'mediaType' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'string',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'dimensions',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
      description: 'For time-based media (film, video, performance)',
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [{ type: 'credit' }],
      description: 'Roles for film/video work',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{ type: 'mediaItem' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'exhibitions',
      title: 'Exhibitions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'exhibition' }] }],
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'award' }] }],
    }),
    defineField({
      name: 'purchaseInquiry',
      title: 'Available for Purchase Inquiry',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Show on website',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'string',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Year (oldest first)',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      artists: 'artists',
      media: 'media',
    },
    prepare({ title, year, artists, media }) {
      const primaryMedia = media?.find((m: any) => m.isPrimary)
      const firstMedia = media?.[0]
      const imageMedia = primaryMedia || firstMedia

      return {
        title,
        subtitle: year ? `${year}` : 'No year',
        media: imageMedia?.type === 'image' ? imageMedia.image : undefined,
      }
    },
  },
})
```

### Object Schemas

#### Education Object (schemas/objects/education.ts)

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'object',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string',
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'number',
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      type: 'number',
      description: 'Leave empty if current',
    }),
  ],
  preview: {
    select: {
      institution: 'institution',
      degree: 'degree',
      startYear: 'startYear',
      endYear: 'endYear',
    },
    prepare({ institution, degree, startYear, endYear }) {
      const years = startYear && endYear
        ? `${startYear}-${endYear}`
        : startYear
        ? `${startYear}-present`
        : ''
      return {
        title: institution,
        subtitle: `${degree || ''} ${years}`,
      }
    },
  },
})
```

#### Media Item Object (schemas/objects/mediaItem.ts)

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mediaItem',
  title: 'Media Item',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video File', value: 'video' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'YouTube', value: 'youtube' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => !['vimeo', 'youtube'].includes(parent?.type),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'isPrimary',
      title: 'Primary Media',
      type: 'boolean',
      description: 'Main display image/video',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      type: 'type',
      caption: 'caption',
      image: 'image',
      isPrimary: 'isPrimary',
    },
    prepare({ type, caption, image, isPrimary }) {
      return {
        title: caption || `${type} item`,
        subtitle: isPrimary ? 'Primary' : '',
        media: image,
      }
    },
  },
})
```

#### Dimensions Object (schemas/objects/dimensions.ts)

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dimensions',
  title: 'Dimensions',
  type: 'object',
  fields: [
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
    }),
    defineField({
      name: 'depth',
      title: 'Depth',
      type: 'number',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Centimeters', value: 'cm' },
          { title: 'Inches', value: 'in' },
          { title: 'Meters', value: 'm' },
        ],
      },
      initialValue: 'cm',
    }),
  ],
  preview: {
    select: {
      width: 'width',
      height: 'height',
      depth: 'depth',
      unit: 'unit',
    },
    prepare({ width, height, depth, unit }) {
      const parts = [width, height, depth].filter(Boolean)
      return {
        title: parts.length > 0 ? `${parts.join(' × ')} ${unit}` : 'No dimensions',
      }
    },
  },
})
```

---

## Schema Index (schemas/index.ts)

```typescript
// Documents
import artist from './documents/artist'
import artwork from './documents/artwork'
import collection from './documents/collection'
import exhibition from './documents/exhibition'
import award from './documents/award'
import mediaType from './documents/mediaType'
import siteSettings from './documents/siteSettings'

// Objects
import dimensions from './objects/dimensions'
import duration from './objects/duration'
import credit from './objects/credit'
import education from './objects/education'
import personalProject from './objects/personalProject'
import mediaItem from './objects/mediaItem'
import socialMedia from './objects/socialMedia'

export const schemaTypes = [
  // Documents
  artist,
  artwork,
  collection,
  exhibition,
  award,
  mediaType,
  siteSettings,

  // Objects
  dimensions,
  duration,
  credit,
  education,
  personalProject,
  mediaItem,
  socialMedia,
]
```

---

## Sanity Config (sanity.config.ts)

```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Atelier Schork',

  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Artworks
            S.listItem()
              .title('Artworks')
              .schemaType('artwork')
              .child(S.documentTypeList('artwork').title('Artworks')),

            S.divider(),

            // Artists
            S.listItem()
              .title('Artists')
              .schemaType('artist')
              .child(
                S.documentTypeList('artist')
                  .title('Artists')
                  .filter('_type == "artist"')
                  .child((documentId) =>
                    S.document().documentId(documentId).schemaType('artist')
                  )
              ),

            S.divider(),

            // Collections
            S.listItem()
              .title('Collections')
              .schemaType('collection')
              .child(S.documentTypeList('collection').title('Collections')),

            // Exhibitions
            S.listItem()
              .title('Exhibitions')
              .schemaType('exhibition')
              .child(S.documentTypeList('exhibition').title('Exhibitions')),

            // Awards
            S.listItem()
              .title('Awards')
              .schemaType('award')
              .child(S.documentTypeList('award').title('Awards')),

            S.divider(),

            // Media Types
            S.listItem()
              .title('Media Types')
              .schemaType('mediaType')
              .child(S.documentTypeList('mediaType').title('Media Types')),

            S.divider(),

            // Site Settings (Singleton)
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
```

---

## Initial Data Setup

### Create Media Types First

1. Photography
2. Film
3. Installation
4. Performance
5. Mixed Media
6. Digital Art
7. Sculpture

### Then Create Core Artists

1. Francisco Schork (set `isCoreArtist: true`)
2. Markus Schork (set `isCoreArtist: true`)

### Create Collections (if applicable)

Example: "Liminal Spaces"

### Add Site Settings

Create the singleton document with contact info and about text.

---

## Frontend Integration

### Next.js Setup

```bash
npm install next-sanity @portabletext/react
npm install @sanity/image-url
```

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Sanity Client (lib/sanity.client.ts)

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
})
```

### Example Query Functions

```typescript
import { client } from './sanity.client'

// Get all published artworks
export async function getArtworks() {
  return client.fetch(`
    *[_type == "artwork" && isPublished == true] | order(year desc) {
      _id,
      title,
      slug,
      year,
      "artists": artists[]->name,
      "mediaTypes": mediaTypes[]->name,
      "primaryImage": media[isPrimary == true][0],
      featured
    }
  `)
}

// Get single artwork by slug
export async function getArtwork(slug: string) {
  return client.fetch(`
    *[_type == "artwork" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      year,
      description,
      materials,
      dimensions,
      duration,
      credits,
      media,
      "artists": artists[]->{
        name,
        slug,
        profileImage
      },
      "mediaTypes": mediaTypes[]->name,
      "collection": collection->{
        title,
        slug
      },
      "exhibitions": exhibitions[]->{
        title,
        venue,
        city,
        startDate,
        endDate
      },
      "awards": awards[]->{
        title,
        organization,
        year
      }
    }
  `, { slug })
}

// Get core artists (Francisco & Markus)
export async function getCoreArtists() {
  return client.fetch(`
    *[_type == "artist" && isCoreArtist == true] {
      _id,
      name,
      slug,
      role,
      profileImage,
      biography
    }
  `)
}
```

---

## Best Practices

### Content Entry

1. **Always set slugs** - Auto-generate from title, ensure uniqueness
2. **Mark primary media** - One media item per artwork should be `isPrimary: true`
3. **Use references** - Link artists, media types, collections, exhibitions, awards
4. **Update exhibition status** - Keep status current (Upcoming → Current → Past)
5. **Add alt text** - For all images (accessibility)

### Performance

1. **Use projections** - Only fetch needed fields in GROQ queries
2. **Enable CDN** - Use `useCdn: true` for public content
3. **Optimize images** - Use Sanity's image pipeline
4. **Implement pagination** - For artwork listings

### SEO

1. **Unique slugs** - All documents should have unique slugs
2. **Meta descriptions** - Use description fields for meta tags
3. **Structured data** - Implement Schema.org markup for artworks
4. **Image optimization** - Use next/image with Sanity image URLs

---

## Deployment Checklist

- [ ] Create Sanity project
- [ ] Set up schemas
- [ ] Configure CORS for your domain in Sanity dashboard
- [ ] Add initial media types
- [ ] Add core artists (Francisco & Markus)
- [ ] Test content entry workflows
- [ ] Set up preview URLs
- [ ] Configure API tokens (if needed for preview/draft mode)
- [ ] Set up frontend integration
- [ ] Test GROQ queries
- [ ] Deploy Sanity Studio
- [ ] Deploy frontend

---

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/sanity-nextjs-guide)
- [Portable Text React](https://github.com/portabletext/react-portabletext)

---

## Future Enhancements

### Phase 2
- [ ] Add blog/news section
- [ ] Add press/publications document type
- [ ] Implement search functionality
- [ ] Add filtering by media type, year, artist

### Phase 3
- [ ] Multilingual support (English/German/Portuguese)
- [ ] E-commerce integration for artwork sales
- [ ] Newsletter integration
- [ ] Advanced analytics

---

This implementation guide provides the foundation for building the Atelier Schork website with Sanity CMS. Adjust as needed based on specific requirements and workflow preferences.
