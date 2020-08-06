import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";

import MapAreaDraw from "./components/map-area-draw";
import Previewer from "./components/previewer";
import {
  BaseLayer,
  ExtendedMarkerProps,
  LayerType,
  MapAreaDrawProps,
  NakshaProps,
  PreviewerProps
} from "./interfaces/naksha";
import Naksha from "./naksha";
import { defaultNakshaProps } from "./static/constants";

export default Naksha;

export {
  BaseLayer,
  LayerType,
  NakshaProps,
  ExtendedMarkerProps,
  defaultNakshaProps,
  theme,
  ThemeProvider,
  CSSReset,
  MapAreaDrawProps,
  MapAreaDraw,
  PreviewerProps,
  Previewer
};
