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
        
        demoCasitaSimple01: resolve(root, 'demoCasitaSimple01/index.html'),
        demoCasitaPalabras01: resolve(root, 'demoCasitaPalabras01/index.html'),

        demoCreadorLaberinto: resolve(root, 'demoCreadorLaberinto/index.html'),
      },
    },
  },
  base:'/miscelaneas/',
})