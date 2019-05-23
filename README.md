# Naksha Components React 🗺️

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
import { Layers } from "naksha-components-react";

<Layers
  mapboxToken="pk.xxx"
  endpoint="https://indiabiodiversity.org"
  layersPanelClosed={true}
/>
```
