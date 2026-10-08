import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Précharge les polices du premier écran (limite le décalage de mise en page).
const PRELOAD_FONTS = [/barlow-condensed-latin-700-normal-.*\.woff2$/, /ibm-plex-sans-latin-400-normal-.*\.woff2$/]

function preloadFonts() {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      const files = Object.keys(ctx.bundle ?? {}).filter((f) => PRELOAD_FONTS.some((re) => re.test(f)))
      return files.map((f) => ({
        tag: 'link',
        attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${f}`, crossorigin: '' },
        injectTo: 'head',
      }))
    },
  }
}

export default defineConfig({
  plugins: [react(), preloadFonts()],
  build: {
    rollupOptions: {
      output: {
        // three.js et react-three-fiber dans des chunks séparés, chargés à la demande
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
          if (id.includes('node_modules/three/')) return 'three'
          if (id.includes('node_modules/@react-three/')) return 'r3f'
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})
