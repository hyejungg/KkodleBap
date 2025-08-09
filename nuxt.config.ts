import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: 'src/',
  dir: {
    public: '../public'
  },
  css: ['~/style.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  typescript: {
    strict: true
  },
  nitro: {
    compatibilityDate: '2025-08-10'
  },
  app: {
    head: {
      title: '꼬들밥',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { property: 'og:title', content: '꼬들밥 (KkodleBap) - 한글 자모 퍼즐 게임' },
        { property: 'og:description', content: '하루 한 그릇, 자모를 모아 만드는 꼬들한 퍼즐! 6개의 한글 자모를 조합하여 정답을 맞혀보세요.' },
        { property: 'og:image', content: 'https://kkodle-bap.hyejungg.me/thumbnail-img.png' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
      ]
    }
  }
})
