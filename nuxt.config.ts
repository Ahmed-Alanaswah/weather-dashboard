// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        },
      ],
      style: [
        {
          type: "text/css",
          children: `
            /* Critical CSS to prevent FOUC */
            [v-cloak] { display: none !important; }
            body { opacity: 0; }
            body.loaded { opacity: 1; transition: opacity 0.2s ease-in; }
            #__nuxt { opacity: 0; transition: opacity 0.3s ease-in; }
            #__nuxt.loaded { opacity: 1; }
            html { font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }
            /* Apply default theme immediately */
            :root { --card-bg: #444; --card-color: #ffffff; --muted-color: rgba(255, 255, 255, 0.8); }
          `,
        },
      ],
      script: [
        {
          children: `
            // Apply theme immediately to prevent flash
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.add('theme-' + theme);
              } catch(e) {}
            })();
          `,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      WEATHERAPI_KEY: process.env.WEATHERAPI_KEY,
    },
  },
  css: ["./public/assets/css/Layout.css"],
  // Optimize CSS loading
  experimental: {
    inlineSSRStyles: false,
  },
  // Ensure CSS is loaded before rendering
  ssr: true,
});
