import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'

// Use environment variables with fallbacks for safety
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id-here'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'atelierschork',

  projectId,
  dataset,

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
