import { config as dotenvConfig } from 'dotenv'
import type { GatsbyConfig } from "gatsby";
dotenvConfig({ path: `.env.${process.env.NODE_ENV}`})
 

const config: GatsbyConfig = {
  siteMetadata: {
    title: `fe-playground`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-styled-components"]
};

export default config;
