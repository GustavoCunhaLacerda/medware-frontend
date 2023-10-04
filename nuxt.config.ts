// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt"],
  css: ["bootstrap/dist/css/bootstrap.css"],
  plugins: [{ src: "./plugins/bootstrap.ts", mode: "client" }],
  imports: {
    dirs: [
      "composables",
      "composables/*/index.{ts,js,mjs,mts}",
      "composables/**",
    ],
  },
});
