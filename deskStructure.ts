// deskStructure.ts
import type {StructureResolver} from 'sanity/structure'

const deskStructure: StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      // Projects & Artworks Group
      S.listItem()
        .title('Project')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('Artwork')
        .child(S.documentTypeList('artwork').title('Artworks')),
      S.listItem()
        .title('Exhibition')
        .child(S.documentTypeList('exhibition').title('Exhibitions')),
      
      // Divider
      S.divider(),
      
      // People & Locations Group
      S.listItem()
        .title('Person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Location')
        .child(S.documentTypeList('location').title('Locations')),
      S.listItem()
        .title('Location Type')
        .child(S.documentTypeList('locationType').title('Location Types')),
      
      // Divider
      S.divider(),
      
      // Taxonomies Group
      S.listItem()
        .title('Medium')
        .child(S.documentTypeList('medium').title('Media')),
      S.listItem()
        .title('Technique')
        .child(S.documentTypeList('technique').title('Techniques')),
      S.listItem()
        .title('Category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Tag')
        .child(S.documentTypeList('tag').title('Tags')),
    ])
}

export default deskStructure 