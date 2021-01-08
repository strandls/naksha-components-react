# Naksha Components React 🗺️

[![GitHub Actions Status](https://github.com/strandls/naksha-components-react/workflows/CI/badge.svg)](https://github.com/strandls/naksha-components-react/actions)
![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/naksha-components-react/latest)
[![typed with TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![stable release](https://badgen.net/github/release/strandls/naksha-components-react/stable)](https://github.com/strandls/naksha-components-react/releases)

Map Components for Biodiversity Informatics Platform

![Grid Layer](./preview/geohash-grid-layer.gif)

![Geoserver Vector Layer](./preview/geoserver-vector-layer.gif)

## 🔌 Packages

- [naksha-components-react](./packages/naksha-components-react/README.md)
- [@ibp/naksha-commons](./packages/naksha-commons/README.md)
- [@ibp/naksha-gmaps-draw](./packages/naksha-gmaps-draw/README.md)
- [@ibp/naksha-mapbox-draw](./packages/naksha-mapbox-draw/README.md)
- [@ibp/naksha-mapbox-list](./packages/naksha-mapbox-list/README.md)
- [@ibp/naksha-mapbox-view](./packages/naksha-mapbox-view/README.md)
- [@ibp/naksha-upload](./packages/naksha-upload/README.md)

## 📦 Development Setup

```sh
git clone https://github.com/strandls/naksha-components-react.git
yarn install
yarn bootstrap
```

## 📚 Storybook

for each library examples are available as storybook stories at `packages/**/stories/*.stories.tsx`

```sh
yarn storybook
```

## 🌀 Using without `@chakra-ui/react`

If you are using any component in a project where `chakra-ui` is not initialized/used you need to do so manually like below

```jsx
import { ChakraProvider } from "@chakra-ui/react";
import { ComponentX } from "naksha-components-react";

<ChakraProvider>
  <ComponentX />
</ChakraProvider>;
```

## 🔧 Configuration

Code quality checks are done with `prettier`, `eslint`.

## 🤠 Credits

- [tsdx](https://github.com/jaredpalmer/tsdx)
- [typescript](https://github.com/microsoft/TypeScript)
- [chakra-ui](https://github.com/chakra-ui/chakra-ui)
- [react-map-gl](https://github.com/uber/react-map-gl)

## 🙏 Contributing

Contributions/Suggestions are always welcome!

## 📄 License

Apache-2.0 &copy; [Strand Life Sciences](https://github.com/strandls)
