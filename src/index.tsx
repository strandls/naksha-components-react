import { theme } from "@chakra-ui/core";

import MapAreaDraw from "./components/map-area-draw";
import {
  BaseLayer,
  LayerType,
  MapAreaDrawProps,
  NakshaProps
} from "./interfaces/naksha";
import Naksha from "./naksha";
import { defaultNakshaProps } from "./static/constants";

export default Naksha;

export {
  BaseLayer,
  LayerType,
  NakshaProps,
  defaultNakshaProps,
  theme,
  MapAreaDrawProps,
  MapAreaDraw
};
