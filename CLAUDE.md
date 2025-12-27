# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Sanity Studio** project for Atelierschork.com, an artistic collaboration between Francisco and Markus Schork. The studio manages content for artworks, projects, exhibitions, people, awards, and related taxonomies.

## Environment Setup

### Required Environment Variables

Create `.env.local` from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Required variables:
- `SANITY_STUDIO_PROJECT_ID` - Your Sanity project ID
- `SANITY_STUDIO_DATASET` - Dataset name (e.g., 'production', 'development')

Both `sanity.config.ts` and `sanity.cli.ts` read from these environment variables.

## Common Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run start        # Alternative to dev
```

### Build & Deploy
```bash
npm run build        # Build production studio
npm run deploy       # Deploy to Sanity's hosted studio
```

### GraphQL
```bash
npm run deploy-graphql    # Deploy GraphQL API
```

### Migrations
```bash
npx sanity migration run <migration-name>    # Run a specific migration
```

Migrations are located in `/migrations` directory and use the Sanity migration framework.

## Schema Architecture

### Core Content Model

The content model is organized into several layers:

**Main Content Documents:**
- `person` - Artists, curators, collaborators (with role references)
- `artwork` - Individual artworks with multi-artist and multi-media support
- `project` - Project groupings with creators and collaborators
- `exhibition` - Exhibitions with structured dates, location, and artwork references
- `award` - Awards and recognition

**Taxonomy Documents:**
- `mediaType` - Art media types (Photography, Film, Installation, etc.)
- `technique` - Artistic techniques
- `tag` - General tagging
- `category` - Categorization
- `role` - Person roles (Artist, Curator, etc.)
- `projectType` - Project types (Art, Logo Design, Website Design, Application, etc.)

**Place Documents:**
- `location` - Physical locations for exhibitions/artworks
- `locationType` - Types of locations

**Settings:**
- `siteSettings` - Singleton for global site configuration

### Schema Organization

All schema types are defined in `/schemaTypes/`:
- Each document type has its own file (e.g., `person.ts`, `artwork.ts`)
- `index.ts` exports all schemas as `schemaTypes` array
- Legacy fields exist for migrations (e.g., `medium` → `mediaType`)

### Important Schema Conventions

**Field Groups:**
Each major document type uses field groups for organization:
- `basic` - Core identifying fields
- `details` / `bio` / `professional` - Detailed information
- `media` - Images, videos, galleries
- `taxonomy` / `classification` - Tags and categorization

**Reference Patterns:**
- Use array of references for many-to-many relationships
- `artists` field on artwork is array of person references
- `mediaType` field on artwork is array of mediaType references
- Single references for one-to-one relationships
- `projectType` field on project is a single projectType reference

**Media Handling:**
Artworks support flexible media with union types:
- `imageMedia` - Image objects with caption, altText, isPrimary flag
- `videoMedia` - Video file uploads
- `vimeoMedia` - Vimeo URL embeds
- `youtubeMedia` - YouTube URL embeds

Each media type has a hidden `mediaType` discriminator field.

**Icons:**
All document types use react-icons/bs (Bootstrap icons) for visual identification in the Studio UI.

## Desk Structure

Custom desk structure is defined in `deskStructure.ts` using **section titles** via `S.divider().title()`:

**Work** (section title)
- Projects - All projects in one list
- [Dynamic] Project type lists - Each project type appears as its own list (e.g., "🎨 Art", "🎨 Logo Design")
- Artworks - Individual artworks with multi-artist and multi-media support
- Exhibitions - Past, current, and upcoming exhibitions
- Awards - Awards and recognition

**People** (section title)
- People - Artists, curators, collaborators with role references
- Roles - Person roles (Artist, Curator, etc.)

**Taxonomies** (section title)
- Media Types - Art media types (Photography, Film, Installation, etc.)
- Techniques - Artistic techniques
- Tags - General tagging system
- Categories - Content categorization
- Project Types - Project types (Art, Logo Design, Website Design, Application, etc.)
- Locations - Physical locations for exhibitions/artworks
- Location Types - Types of locations (Gallery, Museum, etc.)

**Website Settings** (section title)
- Site Settings - Singleton document with fixed ID `siteSettings`

**Implementation:**
- Section titles are created using `S.divider().title('Section Name')`
- This creates visual headers in a flat list structure
- Each section title is followed by the relevant document types
- This approach provides clear organization without nested navigation

### Dynamic Structure Pattern

**Project type lists** are dynamically generated by fetching project types and creating list items:

```typescript
const deskStructure: StructureResolver = async (S, context) => {
  // Fetch all project types
  const projectTypes = await context
    .getClient({apiVersion: '2024-01-01'})
    .fetch(`*[_type == "projectType"] | order(title asc) {_id, title, icon}`)

  return S.list()
    .title('Content')
    .items([
      S.divider().title('Work'),
      S.listItem().title('Projects')...,

      // Map over project types to create individual list items
      ...projectTypes.map((type) =>
        S.listItem()
          .title(`${type.icon || '📁'} ${type.title}`)
          .child(
            S.documentList()
              .title(`${type.title} Projects`)
              .filter('_type == "project" && projectType._ref == $typeId')
              .params({typeId: type._id})
          )
      ),
    ])
}
```

**How it works:**
- Structure resolver is `async` to allow database queries
- Fetches all `projectType` documents on structure load
- Maps over types to create individual list items in the Work section
- Each type gets its own filtered project list (e.g., "🎨 Art" shows only Art projects)
- **Updates when Studio reloads** - refresh to see new project types
- Uses spread operator (`...`) to inline the dynamically created items

**Key differences from nested approach:**
- Project types appear directly in the main list (flat structure)
- Requires async structure resolver
- Slightly slower initial load but cleaner UX
- Better for when you have 3-10 categories; nested approach better for 10+

This pattern can be applied to any taxonomy that documents reference (tags, categories, media types, etc.).

## Important Migration Context

**Person vs Artist Schema:**
The project previously had separate `artist` and `person` schemas but consolidated to a single `person` schema with role references. Migration files exist in `/migrations` to handle this transition.

**Legacy Fields:**
- `medium` schema still exists but is deprecated in favor of `mediaType`
- Comments in schema files indicate migration paths
- Check `/documentation/atelierschork-contentmodel/` for the original content model specification

## Documentation

Comprehensive content model documentation exists in `/documentation/atelierschork-contentmodel/`:
- `README.md` - Overview and navigation
- `content-model.md` - Complete specification of all document types
- `sample-data.md` - Example data and GROQ queries
- `implementation-guide.md` - Technical implementation details

**Refer to this documentation** when:
- Understanding the intended content model design
- Making schema changes
- Writing GROQ queries
- Understanding relationships between document types

## Code Style

**Prettier configuration** (from package.json):
```json
{
  "semi": false,
  "printWidth": 100,
  "bracketSpacing": false,
  "singleQuote": true
}
```

No semicolons, single quotes, no bracket spacing, 100 char line width.

## Schema Validation Patterns

**Common validations:**
- Year fields: `Rule.integer().min(1900).max(new Date().getFullYear() + 1)`
- Required fields: `validation: (Rule) => Rule.required()`
- URLs: `Rule.uri({scheme: ['https'], allowRelative: false})`
- Custom validation with context access for cross-field rules

**Example of cross-field validation** (project.ts):
```typescript
validation: (Rule) => Rule.custom((endYear, context) => {
  const startYear = (context.document as any)?.startYear
  if (endYear && startYear && endYear < startYear) {
    return 'End year must be equal to or after start year'
  }
  return true
})
```

## Preview Configuration

**All documents define custom previews** with:
- `select` - Fields to extract for preview
- `prepare` - Function to format preview display

Common pattern for person names:
```typescript
prepare(selection) {
  const {firstName, middleName, lastName} = selection
  let formattedName = firstName || ''
  if (middleName && middleName.length > 0) {
    formattedName += ` ${middleName.charAt(0)}.`
  }
  if (lastName) {
    formattedName += ` ${lastName}`
  }
  return {title: formattedName.trim(), subtitle, media}
}
```

## Working with Migrations

Migrations use the Sanity migration framework and are TypeScript files in `/migrations`.

**Migration execution:**
```bash
npx sanity migration run <migration-name>
```

**Common migration patterns:**
- Backup data before structural changes
- Update references when document types change
- Fix reference arrays after schema modifications
- Migrate legacy field names to new conventions

## Key Architecture Decisions

1. **Flexible artist attribution** - Artworks support multiple artists via array references, enabling collaborative work
2. **Multi-media support** - Artworks can have multiple media types simultaneously
3. **Role-based person schema** - Single `person` type with role references instead of separate artist/curator types
4. **Grouped fields** - All major schemas use field groups for UX organization
5. **Singleton settings** - Site settings is a singleton document with fixed ID
6. **Custom desk structure** - Organized by content type with dividers and icons for clarity

## Studio Configuration

**Key files:**
- `sanity.config.ts` - Main Studio configuration with plugins and schema
- `sanity.cli.ts` - CLI configuration with project ID, dataset, and deployment settings
- `deskStructure.ts` - Custom desk organization

**Plugins in use:**
- `structureTool` - Custom desk structure
- `visionTool` - GROQ query testing

**Deployment:**
- Studio host: `atelierschork`
- App ID: `yzxbkxz7w1hhvsngvy4s1gsz`
- Auto-updates: enabled
- Always update the @CLAUDE.md file with relevant information after changes made to the code base