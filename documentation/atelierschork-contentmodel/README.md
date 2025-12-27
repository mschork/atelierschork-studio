# Atelier Schork Content Model

**Project**: atelierschork.com
**Artists**: Francisco Schork & Markus Schork
**CMS**: Sanity
**Status**: Design Phase
**Version**: 1.0

---

## Overview

This folder contains the complete content model design for the Atelier Schork website, a platform showcasing the collaborative and individual artistic work of brothers Francisco and Markus Schork.

The content model is designed to be:
- **Flexible** - Supports collaborative work, individual pieces, and collaborations with other artists
- **Scalable** - Extensible to represent the artists beyond their artistic work
- **Multi-media** - Handles various art forms (photography, film, installation, etc.)
- **Well-structured** - Clear relationships between artists, artworks, exhibitions, and awards

---

## Documentation Files

### 📄 [content-model.md](./content-model.md)
**The core content model specification**

Contains detailed documentation of all document types:
- **Artist** - Individual artist profiles (Francisco, Markus, collaborators)
- **Artwork** - Individual pieces with flexible media types
- **Collection** - Series/groupings of related artworks
- **Exhibition** - Past and upcoming exhibitions
- **Award** - Prizes and recognition
- **Media Type** - Taxonomy for art media (Photography, Film, etc.)
- **Site Settings** - Contact info and global settings

Each document type includes:
- Complete field specifications
- Relationship diagrams
- Validation requirements
- Usage guidelines

### 📄 [sample-data.md](./sample-data.md)
**Real-world examples of content**

Contains:
- Sample artist profiles (Francisco, Markus, collaborators)
- Example artworks (collaborative, individual, multi-media)
- Exhibition examples (past, upcoming, solo, group)
- Award examples (artwork-specific, general recognition)
- Site settings example
- GROQ query examples for common use cases

### 📄 [implementation-guide.md](./implementation-guide.md)
**Technical implementation details**

Step-by-step guide for building with Sanity:
- Project setup instructions
- Complete schema implementations (TypeScript)
- Sanity configuration examples
- Frontend integration (Next.js)
- Best practices and deployment checklist
- Performance optimization tips

---

## Key Features

### 🎨 Flexible Artist Attribution
- Artworks can have multiple artists (collaborative work)
- Artists can be core team (Francisco & Markus) or external collaborators
- Detailed credit system for film/video work (roles like Director, Cinematographer)

### 🎬 Multi-Media Support
- Artworks can have multiple media types simultaneously
  - Example: An installation that's also a film
- Extensible media type taxonomy
- Support for images, video files, and external embeds (Vimeo, YouTube)

### 🏛️ Exhibition & Recognition Tracking
- Comprehensive exhibition management (past, current, upcoming)
- Link exhibitions to specific artworks shown
- Track both solo and group exhibitions
- Awards can be linked to artists or specific artworks

### 📚 Collection Organization
- Group related artworks into collections/series
- Track collection time periods
- Optional ongoing collections

### 👤 Comprehensive Artist Profiles
- Full biographical information
- Educational background
- Non-artistic projects and work
- Personal interests
- Social media and contact info
- Downloadable CV support

---

## Content Structure at a Glance

```
Artist (Francisco, Markus, Collaborators)
  ↓
  ├─ Creates → Artwork (individual or collaborative)
  │              ├─ Has → Media Type(s) (Photography, Film, etc.)
  │              ├─ Part of → Collection (optional)
  │              ├─ Shown in → Exhibition(s)
  │              └─ Won → Award(s)
  │
  ├─ Participates in → Exhibition(s)
  └─ Receives → Award(s)
```

---

## Media Types Included

The content model supports these art media (extensible):

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

---

## Use Cases Supported

### Content Management
✅ Add collaborative artworks by both brothers
✅ Add individual artworks by Francisco or Markus
✅ Add artworks created with external collaborators
✅ Organize works into collections/series
✅ Manage past and upcoming exhibitions
✅ Track awards and recognition

### Display & Presentation
✅ Featured artwork on homepage
✅ Filter artworks by artist, media type, year, collection
✅ Exhibition archive and upcoming events
✅ Individual artist pages with full profiles
✅ Artwork detail pages with complete information

### Scalability
✅ Represent artists beyond their artistic work
✅ Non-artistic projects and activities
✅ Educational background and CV
✅ Personal interests and broader context

---

## Next Steps

### Phase 1: Implementation
1. **Set up Sanity project** - Create project and configure Studio
2. **Implement schemas** - Use code from implementation-guide.md
3. **Add initial content** - Media types, core artists, site settings
4. **Test content entry** - Validate workflows and relationships

### Phase 2: Frontend Development
1. **Set up Next.js project** - Create website frontend
2. **Integrate Sanity client** - Connect to CMS
3. **Build core pages** - Homepage, artwork listings, artist profiles
4. **Implement artwork detail pages** - Full artwork information
5. **Create exhibition pages** - Past and upcoming exhibitions

### Phase 3: Launch & Enhancement
1. **Content population** - Add all existing artworks
2. **SEO optimization** - Meta tags, structured data
3. **Performance optimization** - Image optimization, caching
4. **Launch** - Deploy to production
5. **Future features** - Blog, publications, multilingual support

---

## Technical Stack (Recommended)

### CMS
- **Sanity CMS** - Headless CMS with flexible schemas
- **Sanity Studio** - Content editing interface

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **next-sanity** - Sanity integration for Next.js
- **@portabletext/react** - Rich text rendering

### Hosting
- **Vercel** - Frontend hosting (recommended for Next.js)
- **Sanity Cloud** - CMS hosting (included with Sanity)

---

## Questions & Answers

### Can artworks have multiple artists?
**Yes** - The `artists` field is an array of references, supporting any number of collaborators.

### Can an artwork be both Film and Installation?
**Yes** - The `mediaTypes` field is an array, allowing multiple media types per artwork.

### How do we distinguish Francisco's solo work from Atelier Schork collaborations?
**By artist attribution** - Solo work references only one artist, collaborative work references both.

### Can we add new media types later?
**Yes** - Simply create new Media Type documents. The taxonomy is fully extensible.

### How do we handle video content?
**Multiple options**:
- Upload video files directly to Sanity
- Embed Vimeo videos
- Embed YouTube videos

### Can exhibitions show specific artworks?
**Yes** - Exhibitions can reference both participating artists AND specific artworks shown.

### How do we track awards?
**Flexible approach**:
- Awards can be linked to specific artworks
- Awards can be linked to artists generally
- Both approaches supported

---

## Contact & Support

For questions about this content model:
- Review the documentation files
- Check sample-data.md for examples
- Consult implementation-guide.md for technical details

---

## Version History

### Version 1.0 (2025-11-05)
- Initial content model design
- Complete documentation
- Sample data examples
- Implementation guide

---

## File Structure

```
atelierschork/
├── README.md                    # This file - overview and navigation
├── content-model.md             # Complete content model specification
├── sample-data.md               # Real-world data examples
└── implementation-guide.md      # Technical implementation details
```

---

**Ready to implement?** Start with the [Implementation Guide](./implementation-guide.md)

**Need examples?** Check the [Sample Data](./sample-data.md)

**Want details?** Read the [Content Model](./content-model.md)
