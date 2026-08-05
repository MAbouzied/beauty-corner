import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { contentSchemaTypes, staffAccessSchemaTypes } from './schemaTypes';

export default defineConfig([
  {
    name: 'beauty-corner-content',
    title: 'Beauty Corner Blog',
    basePath: '/content',
    projectId: 'nzy22u9z',
    dataset: 'production',
    plugins: [structureTool()],
    schema: {
      types: contentSchemaTypes,
    },
  },
  {
    name: 'beauty-corner-staff-access',
    title: 'Beauty Corner Staff Access',
    basePath: '/staff-auth',
    projectId: 'nzy22u9z',
    dataset: 'staff-auth',
    plugins: [structureTool()],
    schema: {
      types: staffAccessSchemaTypes,
    },
  },
]);
