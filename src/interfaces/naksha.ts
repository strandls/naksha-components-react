import { ViewportProps } from "react-map-gl";

export type LayerType = "grid" | "vector" | "raster";

export enum LayerActions {
  ADD_LAYER,
  REMOVE_LAYER,
  UPDATE_STYLE
}

export enum BaseLayer {
  MAP_STREETS = "0",
  MAP_SATELLITE = "1",
  MAP_DARK = "2",
  MAP_OSM = "3"
}

export interface SelectedLayers {
  id: string;
  type: LayerType;
  source?: string;
}

export interface ExtendedMarkerProps {
  latitude: number;
  longitude: number;
  colorHex: string;
}

export interface NakshaProps {
  viewPort?: Partial<ViewportProps>;

  loadToC?: boolean;
  showToC?: boolean;

  mapboxApiAccessToken: string;
  nakshaApiEndpoint?: string;
  geoserver?: {
    endpoint: string;
    store: string;
    workspace: string;
  };

  selectedLayers?: SelectedLayers[];
  baseLayer?: BaseLayer;
  layers?: GeoserverLayer[];
  markers?: ExtendedMarkerProps[];

  children?;
}

interface VectorStyleMeta {
  styleName?;
  styleTitle?;
  colors?;
}

export interface IUseDisclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export interface GeoserverLayer {
  id: string;
  index?: number;
  title: string;
  description?: string;
  thumbnail?: string;
  bbox?: [[number, number], [number, number]];
  isAdded?: boolean;
  source: {
    type: LayerType;
    scheme?;
    tiles?;
    endpoint?;
  };
  onClick?: ({ bbox, feature, layerId: string }) => JSX.Element;
  onHover?: ({ bbox, feature, layerId: string }) => JSX.Element;
  data?: {
    styles?: VectorStyleMeta[];
    styleIndex?;
    propertyMap?;
    [key: string]: any;
  };
}

export interface MapAreaDrawProps {
  defaultViewPort?: Partial<ViewportProps>;
  mapboxApiAccessToken: string;
  baseLayer?: BaseLayer;
  defaultFeatures?: any[];
  onFeaturesChange?: Function;
  isPolygon?: boolean;
}
