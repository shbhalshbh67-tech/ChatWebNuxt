// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/scripts'
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    'remixicon/fonts/remixicon.css'
  ],
  runtimeConfig: {
    public: {
      googleClientId: "628819496320-sbl92fqchbkjjgr9n0vb1n17c47e9433.apps.googleusercontent.com"
    }
  },
  typescript: {
    strict: false,
    tsConfig: {
      compilerOptions: {
        noImplicitAny: true,          
        strictNullChecks: false,     
        noImplicitThis: false,        
        suppressImplicitAnyIndexErrors: true, 
        skipLibCheck: true            
      }
    }
  }
})