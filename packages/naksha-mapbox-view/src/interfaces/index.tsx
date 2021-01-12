import { BaseLayer } from "@ibp/naksha-commons";
import { ViewportProps } from "react-map-gl";

export interface NakshaMapboxViewProps {
  defaultViewPort?: Partial<ViewportProps>;
  mapboxApiAccessToken: string;
  baseLayer?: BaseLayer;
  data?: any;
}
