//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  experimental: {
    database: true,
  },
  plugins: ['plugins/bot.ts'],
});
