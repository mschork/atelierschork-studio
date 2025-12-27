# Content Model Implementation Plan - Atelierschork Studio

**Date**: 2025-11-17
**Approach**: Hybrid implementation combining documented model with current implementation's best features

## Executive Summary

This plan bridges the gap between the documented content model and current implementation. Analysis shows approximately 40-50% of documented features are missing. We'll implement the documented model while preserving the best elements from the current implementation:

- ✅ Structured person names (firstName/middleName/lastName)
- ✅ Location as separate document for venues
- ✅ Press management in Exhibition
- ✅ Field groups for better editor UX

## Gap Analysis Summary

### Missing from Current Implementation
- Collection document type (artwork series/groupings)
- Award document type (prizes/recognition)
- Site Settings singleton (global configuration)
- Multi-media support in Artwork (video/Vimeo/YouTube)
- Publication workflow (featured, isPublished, orderRank)
- Artist core distinction (isCoreArtist field)
- Several bidirectional relationships

### Current Implementation Additions (Not in Docs)
- Multiple taxonomies (Medium, Technique, Category, Tag)
- Project document (unclear purpose vs. Collection)
- Location document (✅ good addition)
- Complex Person name structure (✅ keep this)

---

## Phase 1: Core Document Updates

### 1.1 Update Person → Artist Schema

**File**: `schemaTypes/person.ts` → rename to `artist.ts`

**Changes**:
- **Keep**: firstName, middleName, lastName structure, field groups
- **Add**:
  - `statement` (portable text) - artist statement
  - `birthYear` (number)
  - `birthPlace` (string)
  - `currentLocation` (string)
  - `education` (array of objects: degree, institution, year)
  - `cv` (file) - PDF upload
  - `personalProjects` (array of objects: title, description, year, url)
  - `interests` (array of strings)
  - `website` (url)
  - `isCoreArtist` (boolean) - distinguish Francisco & Markus
  - `isActive` (boolean) - current collaborators vs. past
- **Update**:
  - `socialMedia` from array to object (instagram, vimeo, other)
  - `roles` keep as reference to Role document

**Migration Notes**:
- Set `isCoreArtist: true` for Francisco Schork and Markus Schork
- Set `isActive: true` for all current people
- Migrate socialMedia array to object structure

---

### 1.2 Update Artwork Schema

**File**: `schemaTypes/artwork.ts`

**Changes**:
- **Rename**: `creators` → `artists` (align with documentation)
- **Add**:
  - `year` (number) - creation year
  - `collection` (reference to Collection)
  - `materials` (string) - materials description
  - `duration` (object: minutes, seconds) - for video/performance
  - `credits` (array of objects: role, person) - film/performance credits
  - `featured` (boolean) - homepage featured flag
  - `isPublished` (boolean) - publication workflow
  - `orderRank` (number) - custom sorting
  - `purchaseInquiry` (boolean) - enable purchase inquiries
  - `exhibitions` (array of references to Exhibition)
  - `awards` (array of references to Award)
- **Replace**:
  - `images` array → `media` array with:
    - type: 'image' | 'video' | 'vimeo' | 'youtube'
    - image (for type='image')
    - video (file, for type='video')
    - url (for type='vimeo' | 'youtube')
    - caption, altText
    - isPrimary (boolean)
- **Update**:
  - `dimensions` from string → object (width, height, depth, unit)
  - `creationDate` → keep but add `year` as primary field
  - `medium` → rename references to `mediaType` for consistency
- **Keep**: techniques, tags, relatedArtworks, project reference

**Field Groups**:
- Basic: title, slug, artists, year
- Details: description, materials, dimensions, duration, mediaType, techniques
- Media: media array, collection
- Exhibition History: exhibitions, awards, credits
- Publication: isPublished, featured, orderRank, purchaseInquiry
- Taxonomy: tags, relatedArtworks

**Migration Notes**:
- Convert `images` array to `media` array with type='image'
- Set first image as `isPrimary: true`
- Extract year from `creationDate` to populate `year` field
- Set default values: `isPublished: true`, `featured: false`, `purchaseInquiry: false`

---

### 1.3 Rename Medium → MediaType Schema

**File**: `schemaTypes/medium.ts` → rename to `mediaType.ts`

**Changes**:
- **Add**:
  - `slug` (slug based on title)
  - `icon` (string) - emoji or icon name
- **Keep**: title, description

**Suggested Media Types** (from documentation):
- Photography
- Film
- Installation
- Performance Art
- Mixed Media
- Digital Art
- Sculpture
- Painting
- Drawing
- Video Art
- Sound Art

**Migration Notes**:
- Generate slugs from existing medium titles
- Add default icons for each type

---

### 1.4 Update Exhibition Schema

**File**: `schemaTypes/exhibition.ts`

**Changes**:
- **Add**:
  - `type` (string: 'solo' | 'group')
  - `status` (string: 'upcoming' | 'current' | 'past')
  - `venue` (string) - venue name as string
  - `city` (string)
  - `country` (string)
  - `participants` (array of artist references) - for group shows
  - `catalogUrl` (url)
  - `pressRelease` (file) - PDF upload
  - `website` (url)
  - `isFeatured` (boolean)
- **Rename**: `featuredArtworks` → `artworks` (simpler naming)
- **Keep**:
  - `location` (reference to Location document) - for rich venue data
  - `press` array (reviews, coverage)
  - `curators` array
  - `featuredProjects` (keep for now)

**Field Groups**:
- Basic: title, slug, type, status
- Details: description, curatedBy, participants, curators
- Dates & Location: startDate, endDate, venue, city, country, location
- Content: artworks, featuredProjects, gallery
- Resources: catalogUrl, pressRelease, website, press
- Meta: isFeatured, tags

**Migration Notes**:
- Calculate `status` based on current date vs. startDate/endDate
- Determine `type` based on number of artists (1 = solo, >1 = group)
- Extract venue/city/country from Location documents if available
- Set `isFeatured: false` as default

---

## Phase 2: New Document Types

### 2.1 Create Collection Schema

**File**: `schemaTypes/collection.ts` (new)

**Fields**:
- `title` (string, required)
- `slug` (slug based on title, required)
- `description` (portable text)
- `startYear` (number)
- `endYear` (number)
- `coverImage` (image)
- `isOngoing` (boolean)

**Field Groups**:
- Basic: title, slug, isOngoing
- Details: description, startYear, endYear
- Media: coverImage

**Preview Configuration**:
- Title: title
- Subtitle: startYear - endYear (or "Ongoing")
- Media: coverImage

**Validation**:
- If not isOngoing, endYear should be >= startYear

---

### 2.2 Create Award Schema

**File**: `schemaTypes/award.ts` (new)

**Fields**:
- `title` (string, required) - award name
- `slug` (slug based on title, required)
- `organization` (string, required) - awarding organization
- `year` (number, required)
- `recipients` (array of artist references, required)
- `artwork` (reference to Artwork) - optional, if award for specific work
- `description` (portable text)
- `category` (string) - award category
- `url` (url) - award website
- `image` (image) - award certificate/photo

**Field Groups**:
- Basic: title, slug, organization, year
- Recipients: recipients, artwork
- Details: description, category, url
- Media: image

**Preview Configuration**:
- Title: title
- Subtitle: organization + year
- Media: image

---

### 2.3 Create Site Settings Schema

**File**: `schemaTypes/siteSettings.ts` (new)

**Type**: Singleton document

**Fields**:
- `siteTitle` (string, required)
- `siteDescription` (text)
- `contactEmail` (email, required)
- `socialMedia` (object):
  - instagram (url)
  - vimeo (url)
  - facebook (url)
  - twitter (url)
  - other (url)
- `address` (object):
  - street (string)
  - city (string)
  - postalCode (string)
  - country (string)
- `aboutText` (portable text)
- `metaImage` (image) - default OG image

**Field Groups**:
- Site Info: siteTitle, siteDescription, metaImage
- Contact: contactEmail, socialMedia, address
- Content: aboutText

**Configuration**:
- Single instance: true
- Name: 'settings'
- Title: 'Site Settings'

---

## Phase 3: Taxonomy Cleanup

### 3.1 Consolidate Taxonomies

**Keep**:
- `mediaType.ts` (renamed from medium.ts)
- `technique.ts` - useful for artwork techniques
- `tag.ts` - flexible tagging
- `role.ts` - person roles

**Evaluate**:
- `category.ts` - May remove if redundant with tags
- `locationType.ts` - Simplify or remove

**Rationale**:
- Documentation specifies single Media Type taxonomy
- Current has 6 taxonomies creating complexity
- Keep essential ones that serve clear purposes

---

## Phase 4: Data Migration

### 4.1 Create Migration Scripts

**Location**: `migrations/` directory

**Scripts**:

1. **`01-backup-current-data.ts`**
   - Export all documents to JSON
   - Store in `/migration-backup` with timestamp
   - Create inventory report

2. **`02-migrate-person-to-artist.ts`**
   - Rename document type person → artist
   - Map existing fields to new structure
   - Set `isCoreArtist: true` for Francisco and Markus
   - Set `isActive: true` for all
   - Convert socialMedia array to object
   - Add empty arrays for new fields

3. **`03-migrate-artwork.ts`**
   - Convert images array to media array with type='image'
   - Set first media item as isPrimary
   - Extract year from creationDate
   - Parse dimensions string to object (if possible)
   - Set default values for new boolean fields
   - Rename creators → artists

4. **`04-migrate-medium-to-mediatype.ts`**
   - Rename document type
   - Generate slugs from titles
   - Add default icons

5. **`05-migrate-exhibition.ts`**
   - Calculate status from dates
   - Determine type from participant count
   - Extract venue info from Location if available
   - Rename featuredArtworks → artworks

6. **`06-migrate-project-to-collection.ts`**
   - Evaluate each Project document
   - Convert appropriate ones to Collection
   - Extract startYear/endYear from date fields
   - Set isOngoing based on endDate

### 4.2 Migration Process

1. **Pre-migration**:
   - Run backup script
   - Review inventory report
   - Test scripts in development dataset

2. **Migration**:
   - Run scripts in order
   - Validate each step before proceeding
   - Generate migration report

3. **Post-migration**:
   - Verify reference integrity
   - Check for orphaned documents
   - Test frontend queries
   - Manual review of sample documents

---

## Phase 5: Configuration Updates

### 5.1 Update sanity.config.ts

**Schema Organization**:

```typescript
schema: {
  types: schemaTypes,
  // Organize into groups
  groups: [
    {
      name: 'content',
      title: 'Content',
      types: ['artwork', 'collection', 'exhibition', 'award']
    },
    {
      name: 'people',
      title: 'People',
      types: ['artist', 'role']
    },
    {
      name: 'places',
      title: 'Places',
      types: ['location', 'locationType']
    },
    {
      name: 'taxonomy',
      title: 'Taxonomy',
      types: ['mediaType', 'technique', 'tag', 'category']
    },
    {
      name: 'settings',
      title: 'Settings',
      types: ['siteSettings']
    }
  ]
}
```

### 5.2 Document List Configuration

**Structure**:
- Featured content section
- Content group (Artworks, Collections, Exhibitions, Awards)
- People group (Artists, Roles)
- Places group (Locations)
- Taxonomy group
- Settings

---

## Phase 6: Testing & Validation

### 6.1 Schema Testing

**Test Cases**:
1. Create new documents of each type
2. Test required field validations
3. Test references between documents
4. Test media uploads (images, videos, PDFs)
5. Test portable text fields
6. Test preview configurations
7. Test search functionality
8. Test singleton (Site Settings)

### 6.2 Migration Validation

**Validation Steps**:
1. Compare document counts (before/after)
2. Verify all references resolve correctly
3. Check for data loss in field conversions
4. Validate media files are accessible
5. Test bidirectional relationships (Artwork ↔ Exhibition)
6. Manual review of 10 sample documents per type

### 6.3 Frontend Testing

**If Frontend Exists**:
1. Test queries for all document types
2. Verify media rendering
3. Test filtering and sorting
4. Validate relationships display correctly
5. Test featured content functionality

---

## Implementation Order

### Recommended Sequence:

1. **Backup Current Data** (migrations/01-backup)
2. **Update Core Schemas** (Phase 1)
   - Artist (person.ts → artist.ts)
   - MediaType (medium.ts → mediaType.ts)
   - Artwork (artwork.ts)
   - Exhibition (exhibition.ts)
3. **Create New Schemas** (Phase 2)
   - Collection (collection.ts)
   - Award (award.ts)
   - Site Settings (siteSettings.ts)
4. **Update Configuration** (Phase 5)
   - sanity.config.ts
   - Document organization
5. **Run Migrations** (Phase 4)
   - In numbered order
   - Validate after each step
6. **Test Everything** (Phase 6)
   - Schema validation
   - Migration validation
   - Frontend testing (if applicable)
7. **Taxonomy Cleanup** (Phase 3)
   - Remove redundant taxonomies
   - Consolidate if needed

---

## Success Criteria

✅ All documented features implemented
✅ Existing data migrated successfully
✅ No data loss during migration
✅ All references resolve correctly
✅ Field groups improve editor UX
✅ Preview configurations working
✅ Site Settings singleton accessible
✅ Featured content workflow functional
✅ Multi-media support in Artwork
✅ Publication workflow (isPublished, featured, orderRank)
✅ Francisco & Markus distinguished with isCoreArtist
✅ Complete system ready for content entry

---

## Rollback Plan

If migration fails:

1. **Stop immediately** - don't proceed with next migration script
2. **Restore from backup** - use backup from migrations/01-backup
3. **Review error logs** - identify what went wrong
4. **Fix migration script** - correct the issue
5. **Test in development** - validate fix works
6. **Re-run migration** - from clean backup

---

## Post-Implementation Tasks

1. **Update Documentation**
   - Revise implementation-guide.md with actual implementation details
   - Document any deviations from plan
   - Add migration notes for future reference

2. **Content Entry Guide**
   - Create guide for content editors
   - Document field purposes and best practices
   - Provide examples for each document type

3. **Frontend Updates** (if applicable)
   - Update queries for new schema structure
   - Implement featured content functionality
   - Add filtering/sorting for new fields
   - Update media rendering for new media array structure

---

## Notes & Considerations

### Best Kept from Current Implementation:
- ✅ **Structured names**: Better for internationalization and display flexibility
- ✅ **Location document**: Enables rich venue data and reuse across exhibitions
- ✅ **Press array**: Practical for managing reviews and coverage
- ✅ **Field groups**: Significantly improves editor experience

### Key Improvements from Documentation:
- ✅ **Multi-media support**: Essential for diverse art forms
- ✅ **Publication workflow**: Critical for editorial control
- ✅ **Collection organization**: Better than Project for artwork series
- ✅ **Award tracking**: Important for artist credentials
- ✅ **isCoreArtist flag**: Distinguishes Atelier Schork core artists

### Migration Risks:
- ⚠️ **Dimensions conversion**: String → object may be lossy if format varies
- ⚠️ **Project → Collection**: May not be 1:1 mapping, needs evaluation
- ⚠️ **Image → Media array**: Need to test with various media types
- ⚠️ **Social media restructure**: Array → object conversion needs mapping

---

## Timeline Estimate

- **Phase 1** (Core Updates): 2-3 days
- **Phase 2** (New Types): 1-2 days
- **Phase 3** (Taxonomy): 0.5 day
- **Phase 4** (Migration): 1-2 days
- **Phase 5** (Configuration): 0.5 day
- **Phase 6** (Testing): 1-2 days

**Total**: 6-10 days of development work

---

## Contact & Support

For questions about this implementation:
- Review original documentation in `/documentation/atelierschork-contentmodel/`
- Consult Sanity documentation: https://www.sanity.io/docs
- Check migration scripts for inline comments

**Implementation Date**: TBD
**Implemented By**: TBD
**Status**: Planning Phase
