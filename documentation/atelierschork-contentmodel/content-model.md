# Atelier Schork Content Model

**Version**: 1.0
**Date**: 2025-11-05
**CMS**: Sanity

## Overview

This content model supports the atelierschork.com website, showcasing the collaborative and individual work of Francisco and Markus Schork, along with their collaborations with other artists.

## Document Types

### 1. Artist

Represents individual artists (Francisco, Markus, and collaborators).

**Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `name` | String | Yes | Full name of the artist |
| `slug` | Slug | Yes | URL-friendly identifier (e.g., "francisco-schork") |
| `role` | String | No | Primary role (e.g., "Artist", "Filmmaker", "Photographer") |
| `profileImage` | Image | No | Portrait/profile photo |
| `biography` | Portable Text | No | Full biography |
| `statement` | Portable Text | No | Artistic statement |
| `birthYear` | Number | No | Year of birth |
| `birthPlace` | String | No | Place of birth |
| `currentLocation` | String | No | Current city/country of residence |
| `education` | Array of Objects | No | Educational background |
| `education.institution` | String | Yes | Name of institution |
| `education.degree` | String | No | Degree or program |
| `education.field` | String | No | Field of study |
| `education.startYear` | Number | No | Start year |
| `education.endYear` | Number | No | End year (or current if ongoing) |
| `cv` | File | No | Downloadable CV (PDF) |
| `personalProjects` | Array of Objects | No | Non-artistic work/projects |
| `personalProjects.title` | String | Yes | Project name |
| `personalProjects.description` | Text | No | Brief description |
| `personalProjects.year` | Number | No | Year |
| `personalProjects.url` | URL | No | External link |
| `interests` | Array of Strings | No | Personal interests |
| `website` | URL | No | Personal website |
| `email` | String | No | Contact email |
| `socialMedia` | Object | No | Social media links |
| `socialMedia.instagram` | URL | No | Instagram profile |
| `socialMedia.vimeo` | URL | No | Vimeo profile |
| `socialMedia.other` | Array of Objects | No | Other platforms |
| `isCoreArtist` | Boolean | No | True for Francisco & Markus |
| `isActive` | Boolean | No | Whether to display on site |

**Relationships:**
- Referenced by: Artwork (artists), Exhibition (participants), Award (recipients)

---

### 2. Media Type

Taxonomy for different art media (Photography, Film, Installation, etc.).

**Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `name` | String | Yes | Name of media type (e.g., "Photography") |
| `slug` | Slug | Yes | URL-friendly identifier |
| `description` | Text | No | Brief description of this medium |
| `icon` | String | No | Icon identifier for UI |

**Initial Values:**
- Photography
- Film
- Installation
- Performance
- Mixed Media
- Digital Art
- Sculpture
- Painting
- Drawing
- Video Art
- Sound Art

**Relationships:**
- Referenced by: Artwork (mediaTypes)

---

### 3. Collection

Represents a series or grouping of related artworks.

**Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String | Yes | Collection name |
| `slug` | Slug | Yes | URL-friendly identifier |
| `description` | Portable Text | No | About this collection/series |
| `startYear` | Number | No | Year collection started |
| `endYear` | Number | No | Year collection ended (if applicable) |
| `coverImage` | Image | No | Main image for collection |
| `isOngoing` | Boolean | No | Whether collection is still active |

**Relationships:**
- Referenced by: Artwork (collection)

---

### 4. Artwork

Individual pieces of art.

**Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String | Yes | Artwork title |
| `slug` | Slug | Yes | URL-friendly identifier |
| `artists` | Array of References | Yes | Artist(s) who created this work |
| `year` | Number | No | Year created |
| `mediaTypes` | Array of References | Yes | Media type(s) - can be multiple |
| `collection` | Reference | No | Part of a collection/series |
| `description` | Portable Text | No | Detailed description of the work |
| `materials` | String | No | Materials used |
| `dimensions` | Object | No | Physical dimensions |
| `dimensions.width` | Number | No | Width |
| `dimensions.height` | Number | No | Height |
| `dimensions.depth` | Number | No | Depth |
| `dimensions.unit` | String | No | Unit (cm, inches, etc.) |
| `duration` | Object | No | For time-based media |
| `duration.minutes` | Number | No | Minutes |
| `duration.seconds` | Number | No | Seconds |
| `credits` | Array of Objects | No | Roles for film/video work |
| `credits.role` | String | Yes | Role (Director, Cinematographer, etc.) |
| `credits.person` | String | Yes | Person's name |
| `media` | Array of Objects | Yes | Images, videos, etc. |
| `media.type` | String | Yes | "image" or "video" or "vimeo" or "youtube" |
| `media.image` | Image | Conditional | Required if type is "image" |
| `media.video` | File | Conditional | Required if type is "video" |
| `media.url` | URL | Conditional | Required if type is "vimeo" or "youtube" |
| `media.caption` | String | No | Caption for this media item |
| `media.isPrimary` | Boolean | No | Main display image/video |
| `exhibitions` | Array of References | No | Exhibitions where this was shown |
| `awards` | Array of References | No | Awards won by this artwork |
| `purchaseInquiry` | Boolean | No | Whether available for inquiry |
| `isPublished` | Boolean | No | Whether to show on website |
| `featured` | Boolean | No | Featured artwork (homepage, etc.) |
| `orderRank` | String | No | Custom ordering (Sanity order field) |

**Relationships:**
- References: Artist (artists), MediaType (mediaTypes), Collection (collection), Exhibition (exhibitions), Award (awards)

---

### 5. Exhibition

Past and upcoming exhibitions.

**Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String | Yes | Exhibition name |
| `slug` | Slug | Yes | URL-friendly identifier |
| `type` | String | Yes | "Solo" or "Group" |
| `status` | String | Yes | "Upcoming", "Current", or "Past" |
| `venue` | String | Yes | Venue/gallery name |
| `city` | String | Yes | City |
| `country` | String | No | Country |
| `startDate` | Date | Yes | Opening date |
| `endDate` | Date | No | Closing date |
| `description` | Portable Text | No | About the exhibition |
| `curatedBy` | String | No | Curator name(s) |
| `participants` | Array of References | No | Artists in this exhibition |
| `artworks` | Array of References | No | Specific artworks shown |
| `catalogUrl` | URL | No | Link to exhibition catalog |
| `pressRelease` | File | No | PDF press release |
| `images` | Array of Images | No | Exhibition installation photos |
| `website` | URL | No | Exhibition website |
| `isFeatured` | Boolean | No | Featured exhibition |

**Relationships:**
- References: Artist (participants), Artwork (artworks)
- Referenced by: Artwork (exhibitions)

---

### 6. Award

Prizes and recognition.

**Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String | Yes | Award name |
| `slug` | Slug | Yes | URL-friendly identifier |
| `organization` | String | No | Awarding organization |
| `year` | Number | Yes | Year awarded |
| `recipients` | Array of References | Yes | Artist(s) who received award |
| `artwork` | Reference | No | Specific artwork (if applicable) |
| `description` | Portable Text | No | About the award |
| `category` | String | No | Award category (if applicable) |
| `url` | URL | No | Link to award website/announcement |
| `image` | Image | No | Award image/logo |

**Relationships:**
- References: Artist (recipients), Artwork (artwork)
- Referenced by: Artwork (awards)

---

### 7. Site Settings

Global site configuration (singleton).

**Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `siteTitle` | String | Yes | Site title |
| `siteDescription` | Text | No | Meta description |
| `contactEmail` | String | No | General contact email |
| `socialMedia` | Object | No | Social media links |
| `socialMedia.instagram` | URL | No | Instagram |
| `socialMedia.vimeo` | URL | No | Vimeo |
| `socialMedia.youtube` | URL | No | YouTube |
| `address` | Object | No | Physical address |
| `address.street` | String | No | Street address |
| `address.city` | String | No | City |
| `address.postalCode` | String | No | Postal code |
| `address.country` | String | No | Country |
| `aboutText` | Portable Text | No | About Atelier Schork |
| `metaImage` | Image | No | Default social share image |

**Note:** This is a singleton document (only one instance).

---

## Content Relationships Diagram

```
Artist
  ↓ referenced by
  ├─ Artwork (artists)
  ├─ Exhibition (participants)
  └─ Award (recipients)

MediaType
  ↓ referenced by
  └─ Artwork (mediaTypes)

Collection
  ↓ referenced by
  └─ Artwork (collection)

Artwork
  ├─ references → Artist (artists)
  ├─ references → MediaType (mediaTypes)
  ├─ references → Collection (collection)
  ├─ references → Exhibition (exhibitions)
  └─ references → Award (awards)

Exhibition
  ├─ references → Artist (participants)
  └─ references → Artwork (artworks)

Award
  ├─ references → Artist (recipients)
  └─ references → Artwork (artwork)
```

---

## Key Features

### Flexible Collaboration Support
- Artworks can have multiple artists
- Artists can be marked as core (Francisco & Markus) or collaborators
- Credits field allows detailed role attribution for film/video work

### Multi-Media Support
- Artworks can have multiple media types (e.g., Installation + Film)
- Extensible media type taxonomy
- Support for images, videos, and external embeds (Vimeo, YouTube)

### Exhibition Tracking
- Past, current, and upcoming exhibitions
- Link exhibitions to specific artworks
- Track solo vs. group shows

### Award Management
- Awards can be linked to artists or specific artworks
- General recognition tracking

### Scalability
- Artist profiles support both artistic and non-artistic work
- Personal interests and projects for broader representation
- Educational background and CV support

### Content Organization
- Collections/series grouping
- Featured content flags
- Custom ordering support
- Published/draft states

---

## Content Entry Guidelines

### Artist Entry
1. Francisco and Markus should have `isCoreArtist: true`
2. All collaborators should be added as separate Artist documents
3. Keep profiles updated with latest bio and CV

### Artwork Entry
1. Always assign at least one artist
2. Select all applicable media types
3. Mark one media item as `isPrimary: true` for main display
4. Link to exhibitions and awards as applicable

### Exhibition Entry
1. Update `status` field as exhibitions progress (Upcoming → Current → Past)
2. Link both participating artists AND specific artworks when known
3. Add installation photos after exhibition

### Media Type
1. Only add new types when absolutely necessary
2. Use existing types when possible to maintain consistency

---

## Future Enhancements (V2)

Potential additions for future versions:
- Blog/News section for announcements
- Press/Publications document type for articles and features
- Client testimonials or reviews
- Workshop/Teaching activities
- Multilingual support (English/German/Portuguese)
- E-commerce integration for artwork sales

---

## Technical Notes

### Sanity-Specific Considerations

1. **Slugs**: Auto-generate from title, ensure uniqueness
2. **Images**: Use Sanity's image pipeline with hotspot/crop support
3. **Portable Text**: Rich text editing for biography, descriptions
4. **References**: Strong typing ensures data integrity
5. **Ordering**: Use `orderRank` field for custom sorting
6. **Validation**: Add required field validation in schema
7. **Preview**: Configure preview URLs for all document types

### Performance
- Index frequently queried fields (slug, year, status)
- Use projections in queries to minimize data transfer
- Implement pagination for artwork listings

### SEO Considerations
- All documents should have slugs for clean URLs
- Artists, Artworks, Exhibitions should have descriptions for meta tags
- Site Settings contains global SEO configuration
