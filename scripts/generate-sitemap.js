import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SitemapStream, streamToPromise } from 'sitemap';

const siteUrl = process.env.SITE_URL || 'https://www.onlinekeyboards.com';
const outputPath = resolve(process.cwd(), 'dist', 'sitemap.xml');

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/sindhi', changefreq: 'weekly', priority: 0.9 },
  { url: '/arabic', changefreq: 'weekly', priority: 0.9 },
  { url: '/urdu-typing-test', changefreq: 'weekly', priority: 0.8 },
  { url: '/sindhi-typing-test', changefreq: 'weekly', priority: 0.8 },
  { url: '/arabic-typing-test', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.4 },
  { url: '/typing-test', changefreq: 'weekly', priority: 0.7 },
  { url: '/exercises', changefreq: 'weekly', priority: 0.7 },
  { url: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
  { url: '/disclaimer', changefreq: 'yearly', priority: 0.3 },
];

async function generateSitemap() {
  await mkdir(resolve(process.cwd(), 'dist'), { recursive: true });

  const sitemapStream = new SitemapStream({ hostname: siteUrl });
  const writeStream = createWriteStream(outputPath);
  sitemapStream.pipe(writeStream);

  links.forEach((link) => sitemapStream.write(link));
  sitemapStream.end();

  await streamToPromise(sitemapStream);
  console.log(`Sitemap generated at ${outputPath}`);
}

generateSitemap().catch((error) => {
  console.error('Failed to generate sitemap.xml', error);
  process.exit(1);
});
