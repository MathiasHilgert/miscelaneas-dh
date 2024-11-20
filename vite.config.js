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
        casitadigitalE1: resolve(root, 'casita_digital_E1/index.html'),
        casitadigitalE2: resolve(root, 'casita_digital_E2/index.html'),
        casitadigital01: resolve(root, 'casita_digital_01/index.html'),
        casitadigital02: resolve(root, 'casita_digital_02/index.html'),
        casitadigital03: resolve(root, 'casita_digital_03/index.html'),
        casitadigital04: resolve(root, 'casita_digital_04/index.html'),
        casitadigital05: resolve(root, 'casita_digital_05/index.html'),
        casitadigital06: resolve(root, 'casita_digital_06/index.html'),
        casitadigital07: resolve(root, 'casita_digital_07/index.html'),
        casitadigital08: resolve(root, 'casita_digital_08/index.html'),
        casitacompleja: resolve(root, 'casitacompleja/index.html'),
        demoCasitaSimple01: resolve(root, 'demoCasitaSimple01/index.html'),
        demoCasitaPalabras01: resolve(root, 'demoCasitaPalabras01/index.html'),
        demoCreadorLaberinto: resolve(root, 'demoCreadorLaberinto/index.html'),

        casitadigitalEN: resolve(root, 'casitadigital_en/index.html'),
        casitadigitalE1EN: resolve(root, 'casita_digital_E1_en/index.html'),
        casitadigitalE2EN: resolve(root, 'casita_digital_E2_en/index.html'),
        casitadigital01EN: resolve(root, 'casita_digital_01_en/index.html'),
        casitadigital02EN: resolve(root, 'casita_digital_02_en/index.html'),
        casitadigital03EN: resolve(root, 'casita_digital_03_en/index.html'),
        casitadigital04EN: resolve(root, 'casita_digital_04_en/index.html'),
        casitadigital05EN: resolve(root, 'casita_digital_05_en/index.html'),
        casitadigital06EN: resolve(root, 'casita_digital_06_en/index.html'),
        casitadigital07EN: resolve(root, 'casita_digital_07_en/index.html'),
        casitadigital08EN: resolve(root, 'casita_digital_08_en/index.html'),
        casitacomplejaEN: resolve(root, 'casitacompleja_en/index.html'),
      },
    },
  },
  base:'/miscelaneas/',
})