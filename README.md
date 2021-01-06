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

```sh
# contains reusable code shared with other packages
@ibp/naksha-commons

# ability to draw polygons over google-maps
@ibp/naksha-gmaps-draw

# ability to draw polygons over mapbox-gl
@ibp/naksha-mapbox-draw

# component with ability to list and show GeoServer layers
@ibp/naksha-mapbox-list

# accepts GeoJSON and shows them over mapbox
@ibp/naksha-mapbox-view

# component that works with naksha-api to enable layer upload
@ibp/naksha-upload

# bundle combining all above packages
naksha-components-react
```

## 📦 Setup

```sh
git clone https://github.com/strandls/naksha-components-react.git
cd naksha-components-react
yarn install
yarn bootstrap
```

## 📚 Storybook

for each library examples are available as storybook stories at `packages/**/stories/*.stories.tsx`

```sh
yarn storybook
```

## 📦 Usage

```sh
yarn add naksha-components-react
```

## 🌀 Using without `@chakra-ui/react`

If you are using any component in a project where `chakra-ui` is not initialized/used you need to do so manually like below

```jsx
import {
  Naksha,
  CSSReset,
  theme,
  ThemeProvider,
} from "naksha-components-react";

<ThemeProvider theme={theme}>
  <CSSReset />
  <Naksha />
</ThemeProvider>;
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
