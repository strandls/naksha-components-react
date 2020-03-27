import { fromJS } from "immutable";
import { useEffect, useState, useRef } from "react";
import superagent from "superagent";
import WebMercatorViewport from "viewport-mercator-project";
import { xml2js } from "xml-js";
import { asyncForEach, parseBbox } from "../components/Layers/utils";
import { STYLES } from "../map-styles";
import { ENDPOINT_GEOSERVER } from "../utils/constants";
import worker from "../components/Layers/worker";
import WebWorker from "../components/Layers/workerSetup";

export default function LayersStore() {
  const [endpoint, setEndpoint] = useState();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isInfobar, setIsInfobar] = useState(false);
  const [item, setItem] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [layers, setLayers] = useState([] as any);
  const [data, setData] = useState([] as any);
  const [myArrayFiltered, setmyArrayFiltered] = useState([] as any);
  const [key, setKey] = useState([] as any);
  const [highlightLayers, _setHighlightLayers] = useState([] as any);
  const [selectedLayers, _setSelectedLayers] = useState([] as any);
  const [layersMeta, setLayersMeta] = useState(new Map());
  const [mapStyleIndex, setMapStyleIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [featureList, setFeatureList] = useState([] as any);
  const [versionTable, setVersionTable] = useState({} as any);
  const [title, setTitle] = useState([] as any);
  const [mapStyle, setMapStyle] = useState(STYLES[mapStyleIndex].style);
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 79,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  useEffect(() => {
    updateLayers();
    // eslint-disable-next-line
  }, [mapStyleIndex, selectedLayers, versionTable]);

  useEffect(() => {}, [endpoint]);

  useEffect(() => {
    updateLayers(false);
    // eslint-disable-next-line
  }, [highlightLayers, data]);

  useEffect(() => {
    if (endpoint) {
      getAllLayers();
    }
    // eslint-disable-next-line
  }, [endpoint]);

  const init = (endpoint, layersPanelClosed) => {
    setEndpoint(endpoint);
    setIsSidebar(!layersPanelClosed);
  };

  /*
   * Selects map layer style like basic, streets, satellite etc
   */

  window.addEventListener("beforeunload", e => {
    var req = window.indexedDB.deleteDatabase("ibpDataBase");
    req.onsuccess = () => {
      console.log("Deleted database successfully");
    };
    req.onerror = () => {
      console.log("Couldn't delete database");
    };
    req.onblocked = () => {
      console.log(
        "Couldn't delete database due to the operation being blocked"
      );
    };
  });

  const onMapStyleChange = (e, item) => {
    STYLES.forEach((style, index) => {
      if (style.key === item.key) {
        setMapStyleIndex(index);
      }
    });
  };

  let version = 1;
  let itemPerPage = 10;
  let pageNumber = 1;
  const DelVersionTable = {} as any;
  const storeData = [] as any;
  const getData = (db, ver, pageNumber) => {
    let fetchData = db.transaction(["fileData" + ver], "readwrite");
    let store = fetchData.objectStore("fileData" + ver);
    const indexOfLastItem = pageNumber * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    let storeRequest = store.getAll(
      IDBKeyRange.bound(indexOfFirstItem, indexOfLastItem)
    );

    let countRequest = store.count();
    storeRequest.onsuccess = () => {
      setData(prevData => [...prevData, storeRequest.result]);
    };
    countRequest.onsuccess = () => {
      setCount(countRequest.result);
    };
  };

  const DeleteStore = ver => {
    let db;
    let request = window.indexedDB.open("ibpDataBase", ++version);
    request.onsuccess = eve => {
      db = request.result;
      db.close();
    };
    request.onupgradeneeded = eve => {
      let db = request.result;
      if (db.objectStoreNames.contains(ver)) {
        db.deleteObjectStore(ver);
      }
    };
  };

  const indexedDB = (passData, id) => {
    version++;
    let db;
    let request = window.indexedDB.open("ibpDataBase", version);
    setVersionTable({ ...versionTable, [id]: version });
    DelVersionTable[id] = version;
    request.onsuccess = eve => {
      db = request.result;
      putData();
      getData(db, version, pageNumber);
      db.close();
    };
    request.onupgradeneeded = eve => {
      let db = request.result;
      if (!db.objectStoreNames.contains("fileData" + version)) {
        db.createObjectStore("fileData" + version, {
          keyPath: "id",
          autoIncrement: true
        });
      }
    };

    const putData = () => {
      let addData = db.transaction(["fileData" + version], "readwrite");
      passData.forEach(ele => {
        addData.objectStore("fileData" + version).add(ele);
      });
    };
  };

  /*
   * If add = true then adds layer otherwise removes it
   */

  let getWorker;
  const mapRef = useRef(null) as any;
  const setSelectedLayers = (eve, item, add = true) => {
    getWorker = new WebWorker(worker);
    setItem(item);
    let getMap = mapRef.current.getMap();
    _setSelectedLayers(a => {
      const filtered = a.filter(i => i.name !== item.name);
      return add ? [...filtered, item] : filtered;
    });
    if (!add) {
      setData(prevState => {
        const tempArr = prevState.filter(k => {
          return k.every(e => {
            return e.itemId !== item.id;
          });
        });
        console.log(tempArr);

        return tempArr;
      });
      DeleteStore("fileData" + DelVersionTable[item.id]);
    } else {
      //getMap.on("idle", () => {
      setTimeout(() => {
        let List = getMap.queryRenderedFeatures({
          layers: [item.name]
        });
        setFeatureList(List);
        let obj = JSON.parse(
          JSON.stringify({
            argu: {
              mapData: List,
              itemId: item.id
            }
          })
        );
        getWorker.postMessage({ argu: obj });
        getWorker.addEventListener(
          "message",
          eve => {
            indexedDB(eve.data, item.id);
            setKey(Object.keys(eve.data[0]));
          },
          false
        );
        setTitle(prevData => [...prevData, item]);
        // });
      }, 2000);
    }
  };

  const selectedLayersNames = () => {
    return selectedLayers.map(i => i.name);
  };

  /*
   * Fetches all layers list from Geoserver
   */
  const getAllLayers = () => {
    setIsLoading(true);
    superagent
      .get(`${endpoint + ENDPOINT_GEOSERVER}/layers/biodiv/wfs`)
      .then(response => {
        const _json = xml2js(response.text, {
          compact: true,
          captureSpacesBetweenElements: true
        });

        let _layers = (
          _json["wfs:WFS_Capabilities"].FeatureTypeList || { FeatureType: [] }
        ).FeatureType;

        if (!Array.isArray(_layers)) {
          _layers = [_layers];
        }

        setLayers(
          _layers.map((f, index) => ({
            id: index + 1,
            value: index + 1,
            name: f.Name._text.split(":")[1],
            title: f.Title._text,
            abstract: f.Abstract._text,
            bbox: parseBbox(f),
            isAdded: false
          })) || []
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const getSelectedStyleByLayerName = layerName => {
    selectedLayers.forEach(sl => {
      if (sl.name === layerName) {
        return sl.selected;
      }
    });
    return Object.keys(layersMeta.get(layerName))[0];
  };

  /*
   * Triggers render for map
   */
  const updateLayers = async (isUpdateToBBox = true) => {
    let newMapStyle = STYLES[mapStyleIndex].style;
    const selectedLayers1: string[] = [];
    setIsLoading(true);

    // Selected Layers
    await asyncForEach(selectedLayers, async l => {
      const meta = await fetchLayer(l.name, l.selected);
      selectedLayers1.push(l.name);
      newMapStyle = newMapStyle
        .setIn(["sources", meta.name], meta.sources)
        .set("layers", newMapStyle.get("layers").push(meta.layers));
      updateToBBox(isUpdateToBBox, l.bbox);
    });

    // Selected Features
    await asyncForEach(highlightLayers, async l => {
      if (layersMeta.has(l.name) && selectedLayers1.includes(l.name)) {
        newMapStyle = newMapStyle.set(
          "layers",
          newMapStyle.get("layers").push(getHighlightMeta(l))
        );
      }
    });

    setIsLoading(false);
    setMapStyle(newMapStyle);
  };

  const updateToBBox = (isUpdateToBBox, bbox) => {
    if (isUpdateToBBox) {
      const viewportx = new WebMercatorViewport(viewport);
      const { longitude, latitude, zoom } = viewportx.fitBounds(bbox);
      setViewport(o => ({
        ...o,
        longitude,
        latitude,
        zoom
      }));
    }
  };

  /*
   * get modified layer, stringify & parse for preventing cloned layer issue
   */
  const getHighlightMeta = l => {
    let meta = fromJS(
      JSON.parse(
        JSON.stringify(
          layersMeta.get(l.name)[getSelectedStyleByLayerName(l.name)]
        )
      ).layers
    );
    meta = meta
      .set("id", `${l.name}-${l.featureId}-highlight`)
      .set("filter", ["in", "__mlocate__id", l.featureId]);
    switch (l.type) {
      case "fill":
        meta = meta.set("paint", {
          ...meta.get("paint").toJS(),
          "fill-outline-color": "red",
          "fill-color": "transparent",
          "fill-opacity": 1
        });
        break;

      case "circle":
        meta = meta.set("paint", {
          ...meta.get("paint").toJS(),
          "circle-stroke-color": "red",
          "circle-stroke-width": 1,
          "circle-opacity": 0
        });
        break;

      default:
        break;
    }
    return meta;
  };

  /*
   * This function will fetch layer Metadata and JSON plus also cache response into store
   */
  const fetchLayer = async (layerName, layerStyle: string = "default") => {
    await fetchLayerAllStyles(layerName);
    const _layerMeta = layersMeta.get(layerName);

    // Set default layer style if not specified
    if (layerStyle === "default") {
      layerStyle = Object.keys(_layerMeta)[0];
    }

    if (!_layerMeta[layerStyle].isLoaded) {
      const r2 = await superagent.get(
        `${endpoint + ENDPOINT_GEOSERVER}/styles/${layerStyle}.json`
      );
      const layerJsonName = r2.body.layers[0].id;
      r2.body.sources[layerJsonName].tiles = r2.body.sources[
        layerJsonName
      ].tiles.map(t => `${endpoint}${t}`);
      _layerMeta[layerStyle] = {
        ..._layerMeta[layerStyle],
        sources: r2.body.sources[layerJsonName],
        layers: r2.body.layers[0],
        name: layerJsonName,
        isLoaded: true
      };

      layersMeta.set(layerName, _layerMeta);
      setLayersMeta(layersMeta);
    }

    return _layerMeta[layerStyle];
  };
  const setHighlightLayers = (event: any) => {
    let el;
    if (
      event.features.length > 0 &&
      event.features[0].properties.__mlocate__id
    ) {
      el = document.getElementById(
        event.features[0].properties.__mlocate__id.toString()
      );
    }
    if (el) {
      el.scrollIntoView();
    }
    const hFeatures: any[] = [];
    event.features.forEach(f => {
      if (
        f.properties.hasOwnProperty("__mlocate__id") &&
        !f.layer.id.includes("-highlight")
      ) {
        const layerMeta = layersMeta.get(f.layer.id);
        const layerTitle = (
          layers.filter(l => l.name === f.layer.id)[0] || { title: f.layer.id }
        ).title;
        const properties = Object.entries(layerMeta).reduce(
          (o, [k, v]: [string, any]) => [
            ...o,
            {
              key: k,
              name: v.styleTitle,
              value: f.properties[k.replace(`${f.layer.id}_`, "")]
            }
          ],
          [] as any
        );
        hFeatures.push({
          name: f.layer.id,
          title: layerTitle,
          type: f.layer.type,
          featureId: f.properties.__mlocate__id,
          properties
        });
      }
    });

    const myArrayFiltered1 = featureList.filter(el => {
      return hFeatures.some(f => {
        return f.featureId === el.properties.__mlocate__id;
      });
    });
    setmyArrayFiltered(myArrayFiltered1);
    _setHighlightLayers(hFeatures);
  };

  const setHighlightLayers1 = (eve, props) => {
    const ele = document.querySelector(".mapboxgl-map");
    if (ele) {
      ele.scrollIntoView();
    }

    const domList = document.querySelectorAll(".ms-FocusZone");
    domList.forEach(element => {
      if (element.classList.contains("selected")) {
        element.classList.remove("selected");
      }
    });
    eve.currentTarget.children[0].classList.add("selected");
    const layerMeta = layersMeta.get(item.name);
    let findType;
    for (let key in layerMeta) {
      for (let key1 in layerMeta[key]) {
        if (key1 === "layers") {
          findType = layerMeta[key][key1];
        }
      }
    }
    const hFeatures: any[] = [];
    hFeatures.push({
      name: item.name,
      title: item.title,
      type: findType.type,
      featureId: props.__mlocate__id,
      props
    });
    _setHighlightLayers(hFeatures);
  };

  const fetchLayerAllStyles = async layerName => {
    if (layersMeta.has(layerName)) {
      return;
    }

    try {
      const response = await superagent.get(
        `${endpoint + ENDPOINT_GEOSERVER}/layers/${layerName}/styles`
      );
      const layerStyleNames = {};
      response.body.forEach(s => {
        layerStyleNames[s.styleName] = {
          styleTitle: s.styleTitle,
          isLoaded: false
        };
      });
      layersMeta.set(layerName, layerStyleNames);
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.error(e);
    }
  };

  return {
    init,
    getSelectedStyleByLayerName,
    highlightLayers,
    isLoading,
    isSidebar,
    isInfobar,
    layers,
    layersMeta,
    mapStyle,
    mapStyleIndex,
    onMapStyleChange,
    selectedLayers,
    selectedLayersNames,
    setHighlightLayers,
    setIsSidebar,
    setIsInfobar,
    setSelectedLayers,
    setViewport,
    viewport,
    endpoint,
    setEndpoint,
    data,
    key,
    setHighlightLayers1,
    myArrayFiltered,
    mapRef,
    count,
    itemPerPage,
    getData,
    versionTable,
    item,
    title,
    storeData
  };
}
