const { EleventyI18nPlugin } = require("@11ty/eleventy");
const { execSync } = require('child_process')
const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');

module.exports = eleventyConfig => {

  // Copy `assets/` to `_site/assets`
  eleventyConfig.addPassthroughCopy("assets");

  // Copy the CNAME file that lets the custom domain talk to GH Pages
  eleventyConfig.addPassthroughCopy("CNAME");
  
  // set default language to Spanish 
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    // any valid BCP 47-compatible language tag is supported
    defaultLanguage: "es", // Required, this site uses "en"
  });

  // add support for markdown footnote format
  // https://markdown-it.github.io/
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  };
  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItFootnote));

  // after the build, run pagefind to generate the search index
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  });
  
};
