const config = {
  providers: [
    {
      // Ensure that the CLERK_ISSUER_URL environment variable is set on the Convex website, not in the .env file
      domain: process.env.CLERK_ISSUER_URL,
      applicationID: "convex",
    },
  ],
};

export default config;
