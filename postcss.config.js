module.exports = {
  plugins: [

    /**
     * Do tailwind. Reads the content config from
     * tailwind.config.js to search files for class
     * and className to build a css file with ref'd
     * tailwind classes.
     */
    require('tailwindcss')({}),

    /**
     * Tailwind uses --var/var() css feature which
     * email strongly does not support. This plugin
     * removes those refs and replaces with the value.
     */
    require('postcss-css-variables')({}),

    /**
     * Tailwind uses functional color notation (rgb
     * colors in css with no commas and added slash).
     * This plugin converts those to the classic version.
     */
    require('postcss-color-functional-notation')({}),

    /**
     * Autoprefixes bruh...
     */
    require('autoprefixer')({
      flexbox: true
    })
  ],
}
