import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'atelierschork',

  projectId: 'your-project-id-here',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
