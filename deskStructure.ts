// deskStructure.ts
import type {StructureResolver} from 'sanity/structure'
import {
  BsFileEarmarkText, 
  BsPalette, 
  BsBuilding, 
  BsPerson, 
  BsGeoAlt,
  BsDroplet,
  BsBrush,
  BsFolder,
  BsGeoFill,
  BsTag
} from 'react-icons/bs'

const deskStructure: StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      // Projects & Artworks Group
      S.listItem()
        .title('Project')
        .icon(BsFileEarmarkText)
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('Artwork')
        .icon(BsPalette)
        .child(S.documentTypeList('artwork').title('Artworks')),
      S.listItem()
        .title('Exhibition')
        .icon(BsBuilding)
        .child(S.documentTypeList('exhibition').title('Exhibitions')),
      
      // Divider
      S.divider(),
      
      // People & Locations Group
      S.listItem()
        .title('Person')
        .icon(BsPerson)
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Location')
        .icon(BsGeoAlt)
        .child(S.documentTypeList('location').title('Locations')),
      
      // Divider
      S.divider(),
      
      // Taxonomies Group
      S.listItem()
        .title('Medium')
        .icon(BsDroplet)
        .child(S.documentTypeList('medium').title('Media')),
      S.listItem()
        .title('Technique')
        .icon(BsBrush)
        .child(S.documentTypeList('technique').title('Techniques')),
      S.listItem()
        .title('Category')
        .icon(BsFolder)
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Location Type')
        .icon(BsGeoFill)
        .child(S.documentTypeList('locationType').title('Location Types')),
      S.listItem()
        .title('Tag')
        .icon(BsTag)
        .child(S.documentTypeList('tag').title('Tags')),
    ])
}

export default deskStructure 