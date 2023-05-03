import { defineConfig } from "vite";
import {resolve} from 'path'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname,'dist')

export default defineConfig({
    root,
    build:{
        outDir,
        emptyOutDir:true,
        rollupOptions:{
            input:{
                main: resolve(root, 'index.html'),
                about:resolve(root,'about','about.html'),
                checkout:resolve(root,'checkout','checkout.html'),
                contact:resolve(root,'contact','contact.html'),
                details:resolve(root,'details','details.html'),
                store:resolve(root,'store','store.html'),
                
            }
        }
    }
})