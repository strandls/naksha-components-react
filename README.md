# Naksha Components React 🗺️

![Dependencies](https://img.shields.io/david/strandls/naksha-components-react.svg)

![Bundle Size](https://img.shields.io/bundlephobia/minzip/naksha-components-react.svg)

Mapbox GL Components for IndiaBiodiversity

- Components Built with React & Typescript
- Storybook setup for development isolation in Typescript
- Documentation at http://naksha-components-react.netlify.com

---

## Setup

```shell
git clone <REPO>
cd naksha-components-react
yarn # or npm i
yarn storybook
```

## Build

```shell
yarn build
```

## Build storybook

```shell
yarn build:storybook
```

## Usage

```tsx
// global style bundle
import "naksha-components-react/dist/index.css";

// Layers
import { Layers, Upload } from "naksha-components-react";

// Layers
<Layers
  mapboxToken="pk.xxx"
  endpoint="https://example.com/naksha"
  layersPanelClosed={true}
/>;

// Uploader
<Upload endpoint="https://example.com/naksha/layer/uploadshp" />;
```
