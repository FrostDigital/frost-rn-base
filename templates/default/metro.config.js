module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolverMainFields: ["sbmodern", "browser", "main"],
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
  },
};
