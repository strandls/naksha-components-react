const path = require("path");

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
          "@emotion/styled-base": toPath("node_modules/@emotion/styled"),
        },
      },
    };
  },
};
