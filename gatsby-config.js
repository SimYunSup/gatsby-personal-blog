require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.js
    siteTitle: `Ethan Sup\'s log`,
    siteTitleAlt: `Ethan Sup\'s log`,
    siteHeadline: `Ethan Sup\'s log`,
    siteUrl: `https://ethapsup.net`,
    siteDescription: `기록을 위한 블로그`,
    siteLanguage: `ko`,
    author: `@SimYunSup`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        mdx: true,
        sharp: false,
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Github`,
            url: `https://github.com/SimYunSup`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        // If you plan on changing the font you'll also need to adjust the Theme UI config to edit the CSS
        // See: https://github.com/LekoArts/gatsby-themes/tree/main/examples/minimal-blog#changing-your-fonts
        web: [
          {
            name: `IBM Plex Sans`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ethan Sup\'s log`,
        short_name: `Ethan Sup\'s log`,
        description: `기록을 위한 블로그`,
        start_url: `/`,
        background_color: `#fff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            "src": "\/android-icon-36x36.png",
            "sizes": "36x36",
            "type": "image\/png",
           },
           {
            "src": "\/android-icon-48x48.png",
            "sizes": "48x48",
            "type": "image\/png",
           },
           {
            "src": "\/android-icon-72x72.png",
            "sizes": "72x72",
            "type": "image\/png",
           },
           {
            "src": "\/android-icon-96x96.png",
            "sizes": "96x96",
            "type": "image\/png",
           },
           {
            "src": "\/android-icon-144x144.png",
            "sizes": "144x144",
            "type": "image\/png",
           },
           {
            "src": "\/android-icon-192x192.png",
            "sizes": "192x192",
            "type": "image\/png",
           }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.description,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": post.description }],
                }
              }),
            query: `
              {
                allPost(sort: { fields: date, order: DESC }) {
                  nodes {
                    title
                    date(formatString: "MMMM D, YYYY")
                    description
                    slug
                  }
                }
              }
            `,
            output: `rss.xml`,
            title: `Ethan sup\'s log`,
          },
        ],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
      
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "GA-TRACKING_ID", // Google Analytics / GAs
        ],
        gtagConfig: {
          optimize_id: "G-1RB65T4SPV",
          anonymize_ip: true,
          cookie_expires: 0,
        },
      }
    }
  ].filter(Boolean),
}
