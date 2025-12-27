# Sample Data Examples

This document shows example data for the Atelier Schork content model.

---

## Sample Artists

### Francisco Schork
```yaml
_type: artist
name: "Francisco Schork"
slug: "francisco-schork"
role: "Artist & Filmmaker"
profileImage: [image asset]
biography: |
  Francisco Schork is a visual artist and filmmaker based in Berlin...
statement: |
  My work explores the intersection of memory and space...
birthYear: 1985
birthPlace: "São Paulo, Brazil"
currentLocation: "Berlin, Germany"
education:
  - institution: "Universität der Künste Berlin"
    degree: "MFA"
    field: "Visual Arts"
    startYear: 2010
    endYear: 2013
  - institution: "Universidade de São Paulo"
    degree: "BA"
    field: "Film Studies"
    startYear: 2004
    endYear: 2008
cv: [PDF file asset]
personalProjects:
  - title: "Documentary Series: Urban Landscapes"
    description: "A personal project documenting changing cityscapes"
    year: 2020
    url: "https://example.com/project"
interests:
  - "Architecture"
  - "Urban Planning"
  - "Philosophy"
website: "https://franciscoschork.com"
email: "francisco@atelierschork.com"
socialMedia:
  instagram: "https://instagram.com/franciscoschork"
  vimeo: "https://vimeo.com/franciscoschork"
isCoreArtist: true
isActive: true
```

### Markus Schork
```yaml
_type: artist
name: "Markus Schork"
slug: "markus-schork"
role: "Artist & Photographer"
profileImage: [image asset]
biography: |
  Markus Schork is a visual artist and photographer...
statement: |
  I am interested in the transformation of natural forms...
birthYear: 1987
birthPlace: "São Paulo, Brazil"
currentLocation: "Lisbon, Portugal"
education:
  - institution: "Royal College of Art"
    degree: "MA"
    field: "Photography"
    startYear: 2012
    endYear: 2014
cv: [PDF file asset]
personalProjects:
  - title: "Tech Consultancy Work"
    description: "Digital strategy consulting for cultural institutions"
    year: 2018
interests:
  - "Technology"
  - "Natural Sciences"
  - "Literature"
website: "https://markusschork.com"
email: "markus@atelierschork.com"
socialMedia:
  instagram: "https://instagram.com/markusschork"
isCoreArtist: true
isActive: true
```

### Sample Collaborator
```yaml
_type: artist
name: "Ana Silva"
slug: "ana-silva"
role: "Sound Artist"
biography: |
  Ana Silva is a sound artist working with field recordings...
website: "https://anasilva.art"
isCoreArtist: false
isActive: true
```

---

## Sample Media Types

```yaml
# Photography
_type: mediaType
name: "Photography"
slug: "photography"
description: "Still photographic works"
icon: "camera"

# Film
_type: mediaType
name: "Film"
slug: "film"
description: "Moving image works"
icon: "film"

# Installation
_type: mediaType
name: "Installation"
slug: "installation"
description: "Site-specific and installation works"
icon: "cube"

# Performance
_type: mediaType
name: "Performance"
slug: "performance"
description: "Live performance works"
icon: "user"

# Mixed Media
_type: mediaType
name: "Mixed Media"
slug: "mixed-media"
description: "Works combining multiple media"
icon: "layers"
```

---

## Sample Collection

```yaml
_type: collection
title: "Liminal Spaces"
slug: "liminal-spaces"
description: |
  A series exploring transitional environments and threshold moments,
  created between 2018-2020 across various European cities.
startYear: 2018
endYear: 2020
coverImage: [image asset]
isOngoing: false
```

---

## Sample Artworks

### Example 1: Collaborative Photography Work
```yaml
_type: artwork
title: "Between Walls"
slug: "between-walls"
artists:
  - [Reference to Francisco Schork]
  - [Reference to Markus Schork]
year: 2019
mediaTypes:
  - [Reference to Photography]
collection: [Reference to "Liminal Spaces" collection]
description: |
  A photographic series documenting the interstitial spaces in Berlin's
  post-industrial architecture. Shot over six months, the series captures
  the poetry of abandonment and transformation.
materials: "Digital photography, archival pigment prints"
dimensions:
  width: 100
  height: 70
  unit: "cm"
media:
  - type: "image"
    image: [image asset 1]
    caption: "Between Walls #1"
    isPrimary: true
  - type: "image"
    image: [image asset 2]
    caption: "Between Walls #3"
  - type: "image"
    image: [image asset 3]
    caption: "Between Walls #7"
exhibitions:
  - [Reference to "Transitions" exhibition]
purchaseInquiry: true
isPublished: true
featured: true
```

### Example 2: Film Installation with Multiple Media Types
```yaml
_type: artwork
title: "Echoes in Concrete"
slug: "echoes-in-concrete"
artists:
  - [Reference to Francisco Schork]
  - [Reference to Ana Silva]
year: 2020
mediaTypes:
  - [Reference to Film]
  - [Reference to Installation]
  - [Reference to Sound Art]
description: |
  A three-channel video installation with spatial sound design exploring
  the acoustic properties of brutalist architecture.
duration:
  minutes: 18
  seconds: 30
credits:
  - role: "Direction & Cinematography"
    person: "Francisco Schork"
  - role: "Sound Design & Composition"
    person: "Ana Silva"
  - role: "Sound Recording"
    person: "Ana Silva"
media:
  - type: "image"
    image: [installation view]
    caption: "Installation view at Museum X"
    isPrimary: true
  - type: "vimeo"
    url: "https://vimeo.com/123456789"
    caption: "Video excerpt"
  - type: "image"
    image: [detail shot]
    caption: "Detail of projection setup"
exhibitions:
  - [Reference to exhibition]
awards:
  - [Reference to award]
isPublished: true
featured: true
```

### Example 3: Individual Work by Markus
```yaml
_type: artwork
title: "Botanical Geometries"
slug: "botanical-geometries"
artists:
  - [Reference to Markus Schork]
year: 2021
mediaTypes:
  - [Reference to Photography]
description: |
  A photographic study of geometric patterns in plant structures,
  exploring the mathematical principles underlying natural forms.
materials: "Digital photography"
dimensions:
  width: 80
  height: 120
  unit: "cm"
media:
  - type: "image"
    image: [image asset]
    caption: "Fern Pattern #12"
    isPrimary: true
  - type: "image"
    image: [image asset]
    caption: "Succulent Series #4"
isPublished: true
featured: false
```

---

## Sample Exhibitions

### Upcoming Exhibition
```yaml
_type: exhibition
title: "Transitions: Contemporary Photography from Berlin"
slug: "transitions-berlin-2025"
type: "Group"
status: "Upcoming"
venue: "Kunsthalle München"
city: "Munich"
country: "Germany"
startDate: "2025-03-15"
endDate: "2025-06-01"
description: |
  A group exhibition featuring contemporary photographers working in Berlin,
  exploring themes of urban transformation and cultural memory.
curatedBy: "Dr. Maria Schmidt"
participants:
  - [Reference to Francisco Schork]
  - [Reference to Markus Schork]
  - [References to other artists]
artworks:
  - [Reference to "Between Walls"]
  - [References to other works]
website: "https://kunsthalle-muenchen.de/transitions"
isFeatured: true
```

### Past Exhibition
```yaml
_type: exhibition
title: "Atelier Schork: Retrospective 2015-2020"
slug: "atelier-schork-retrospective"
type: "Solo"
status: "Past"
venue: "Berlinische Galerie"
city: "Berlin"
country: "Germany"
startDate: "2020-09-10"
endDate: "2020-12-15"
description: |
  A comprehensive retrospective of five years of collaborative work
  by Francisco and Markus Schork.
participants:
  - [Reference to Francisco Schork]
  - [Reference to Markus Schork]
artworks:
  - [Reference to multiple artworks]
catalogUrl: "https://example.com/catalog.pdf"
pressRelease: [PDF file asset]
images:
  - [installation photo 1]
  - [installation photo 2]
  - [opening night photo]
isFeatured: true
```

---

## Sample Awards

### Artwork-Specific Award
```yaml
_type: award
title: "Best Experimental Film Award"
slug: "best-experimental-film-2020"
organization: "International Short Film Festival"
year: 2020
recipients:
  - [Reference to Francisco Schork]
  - [Reference to Ana Silva]
artwork: [Reference to "Echoes in Concrete"]
description: |
  Awarded for innovative approach to spatial sound design in video installation.
category: "Experimental Film"
url: "https://filmfestival.com/awards/2020"
image: [award logo]
```

### General Recognition
```yaml
_type: award
title: "Emerging Artist Grant"
slug: "emerging-artist-grant-2018"
organization: "Berlin Arts Council"
year: 2018
recipients:
  - [Reference to Markus Schork]
description: |
  Grant awarded for promising emerging artists working in photography.
url: "https://berlinarts.de/grants"
```

---

## Sample Site Settings

```yaml
_type: siteSettings
siteTitle: "Atelier Schork"
siteDescription: "Francisco and Markus Schork are visual artists working across photography, film, and installation. Their collaborative practice explores themes of memory, space, and transformation."
contactEmail: "contact@atelierschork.com"
socialMedia:
  instagram: "https://instagram.com/atelierschork"
  vimeo: "https://vimeo.com/atelierschork"
  youtube: "https://youtube.com/@atelierschork"
address:
  city: "Berlin"
  country: "Germany"
aboutText: |
  Atelier Schork is the collaborative practice of brothers Francisco and Markus Schork.

  Since 2015, they have been creating works that explore the intersection of personal
  memory and shared space, often collaborating with sound artists, architects, and
  other creative practitioners.

  Their work has been exhibited internationally and is held in several public and
  private collections.
metaImage: [default social share image]
```

---

## Query Examples (GROQ)

### Get all artworks by Francisco
```groq
*[_type == "artwork" && references(*[_type == "artist" && slug.current == "francisco-schork"]._id)] {
  title,
  year,
  slug,
  "artists": artists[]->name,
  "mediaTypes": mediaTypes[]->name,
  "primaryImage": media[isPrimary == true][0]
}
```

### Get upcoming exhibitions
```groq
*[_type == "exhibition" && status == "Upcoming"] | order(startDate asc) {
  title,
  venue,
  city,
  startDate,
  endDate,
  "participants": participants[]->name
}
```

### Get all photography works
```groq
*[_type == "artwork" && references(*[_type == "mediaType" && slug.current == "photography"]._id)] {
  title,
  year,
  "artists": artists[]->name
}
```

### Get works in a specific collection
```groq
*[_type == "artwork" && collection->slug.current == "liminal-spaces"] {
  title,
  year,
  "collection": collection->title
}
```

### Get all awards for a specific artist
```groq
*[_type == "award" && references(*[_type == "artist" && slug.current == "markus-schork"]._id)] {
  title,
  year,
  organization,
  "artwork": artwork->title
}
```

---

## Notes on Sample Data

- All references are indicated with `[Reference to ...]` placeholders
- Image and file assets are indicated with `[image asset]` or `[PDF file asset]`
- Portable Text fields are shown as plain text for simplicity
- Dates are in ISO format (YYYY-MM-DD)
- Arrays are properly structured for Sanity
- Boolean fields default to appropriate values
