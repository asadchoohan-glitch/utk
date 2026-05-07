import { defineConfig } from 'vite';
import { resolve } from 'path';

const cleanUrlRoutes = {
  '/': '/index.html',
  '/sindhi': '/sindhi.html',
  '/arabic': '/arabic.html',
  '/urdu-typing-test': '/urdu-typing-test.html',
  '/sindhi-typing-test': '/sindhi-typing-test.html',
  '/arabic-typing-test': '/arabic-typing-test.html',
  '/about': '/about.html',
  '/contact': '/contact.html',
  '/privacy-policy': '/privacy-policy.html',
  '/typing-test': '/typing-test.html',
  '/exercises': '/exercises.html',
  '/terms-of-service': '/terms-of-service.html',
  '/disclaimer': '/disclaimer.html',
};

function cleanUrlPlugin() {
  const rewrite = (url) => cleanUrlRoutes[url] || url;
  return {
    name: 'clean-url-routes',
    configureServer(server) {
      server.middlewares.use((req, _, next) => {
        if (req.url) req.url = rewrite(req.url);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _, next) => {
        if (req.url) req.url = rewrite(req.url);
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [cleanUrlPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sindhi: resolve(__dirname, 'sindhi.html'),
        arabic: resolve(__dirname, 'arabic.html'),
        urduTypingTest: resolve(__dirname, 'urdu-typing-test.html'),
        sindhiTypingTest: resolve(__dirname, 'sindhi-typing-test.html'),
        arabicTypingTest: resolve(__dirname, 'arabic-typing-test.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
      },
    },
  },
  server: {
    open: true,
  },
});
