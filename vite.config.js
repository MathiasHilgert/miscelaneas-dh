import { resolve } from 'path'
import { defineConfig } from 'vite'

const root=resolve(__dirname,'src')
const outDir=resolve(__dirname,'dist')
export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir:true,
    rollupOptions: {
      input: {
        casitadigital: resolve(root, 'casitadigital/index.html'),
        casitacompleja: resolve(root, 'casitacompleja/index.html'),
      },
    },
  },
  base:'/miscelaneas/',
})