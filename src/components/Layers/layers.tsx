import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Pivot,
  PivotItem
} from "office-ui-fabric-react";
import { useStore } from "outstated";
import React, { useEffect, useState, useRef } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import LayersStore from "../../stores/layers.store";
import ControlPanel from "./control-panel";
import InfoPanel from "./info-panel";
import { If } from "control-statements";
import Pagination from "react-js-pagination-bs4";

export default function Layers({ mapboxToken, endpoint, layersPanelClosed }) {
  const layerStore = useStore(LayersStore);

  const [Header, setHeader] = useState([] as any);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    layerStore.init(endpoint, layersPanelClosed);
    // eslint-disable-next-line
    setHeader(
      layerStore.key.map((o, id) => ({
        id,
        text: o,
        key: o,
        fieldName: o,
        name: o,
        minWidth: 160,
        isResizable: true,
        isPadded: false
      }))
    );
  }, [mapboxToken, endpoint, layersPanelClosed, layerStore.key, activePage]);

  const onViewportChange = (viewport: any) => {
    layerStore.setViewport(viewport);
  };

  // const toggleInfobar = (e) => {
  //   e.stopPropagation()
  //  layerStore.setIsInfobar(!layerStore.isInfobar);
  // };
  //const list = Array.isArray(layerStore.data) ? layerStore.data : ([] as any);

  // const handlePageChange = pageNumber => {
  //   setActivePage(pageNumber);
  //   let db;
  //   let request = window.indexedDB.open(
  //     "ibpDataBase",
  //     layerStore.versionTable[layerStore.item.id]
  //   );

  //   request.onerror = eve => {
  //     console.log("error: " + request.error);
  //   };

  //   request.onsuccess = eve => {
  //     db = request.result;
  //     layerStore.getData(
  //       db,
  //       layerStore.versionTable[layerStore.item.id],
  //       pageNumber
  //     );
  //     console.log("success: " + db);
  //   };
  // };
  const _onRenderRow = (props, defaultRender) => {
    const isExist = layerStore.myArrayFiltered.find(
      e => e.__mlocate__id === props.item.__mlocate__id
    );
    return (
      <div
        id={props.item.__mlocate__id}
        onClick={eve => layerStore.setHighlightLayers1(eve, props.item)}
      >
        {defaultRender({ ...props, className: !!isExist ? "selected" : "" })}
      </div>
    );
  };

  const hideColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    if (column.key === "__mlocate__id" || column.key === "itemId") {
      column.className = "hide";
    }
    return fieldContent;
  };
  return (
    <div className=" container ncr naksha--layers">
      <div className="row no-gutters">
        <div className="col-4">
          <ControlPanel
            layers={layerStore.layers}
            layersMeta={layerStore.layersMeta}
            onMapStyleChange={layerStore.onMapStyleChange}
            mapStyleIndex={layerStore.mapStyleIndex}
            selectedLayersNames={layerStore.selectedLayersNames()}
            getSelectedStyleByLayerName={layerStore.getSelectedStyleByLayerName}
            setSelectedLayers={layerStore.setSelectedLayers}
            isLoading={layerStore.isLoading}
            isSidebar={layerStore.isSidebar}
            setIsSidebar={layerStore.setIsSidebar}
            endpoint={endpoint}
          />
          {/* <InfoPanel
            highlightLayers={layerStore.highlightLayers}
            isInfobar={layerStore.isInfobar}
            setIsInfobar={layerStore.setIsInfobar}
          /> */}
        </div>
        <div className="col-8">
          <ReactMapGL
            {...layerStore.viewport}
            mapStyle={layerStore.mapStyle}
            height="100%"
            width="100%"
            ref={layerStore.mapRef}
            onViewportChange={onViewportChange}
            mapboxApiAccessToken={mapboxToken}
            onClick={layerStore.setHighlightLayers}
          >
            <div className="nav">
              <NavigationControl onViewportChange={onViewportChange} />
            </div>
            {/* <Toggle
            label="Table View"
            onChange={toggleInfobar}
            role="checkbox"
            disabled={layerStore.toggle}
          />  */}
          </ReactMapGL>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col-4"></div>
        <div className="col-8 addVertiScroll">
          <div className="addHoriScroll">
            <Pivot>
              {layerStore.data.map((arr, idx) => {
                return (
                  <PivotItem
                    className="p-2"
                    itemKey={idx}
                    key={idx}
                    headerText={layerStore.title[idx].title}
                  >
                    <DetailsList
                      items={arr}
                      columns={Header}
                      selectionMode={SelectionMode.none}
                      setKey={idx}
                      onRenderRow={_onRenderRow}
                      isHeaderVisible={true}
                      onRenderItemColumn={hideColumn}
                      layoutMode={DetailsListLayoutMode.fixedColumns}
                      onShouldVirtualize={() => {
                        return false;
                      }}
                    />
                  </PivotItem>
                );
              })}
            </Pivot>
            {/* <Pagination
              activePage={activePage}
              itemsCountPerPage={layerStore.itemPerPage}
              totalItemsCount={layerStore.count}
              onChange={handlePageChange}
              prevPageText="prev"
              nextPageText="next"
              firstPageText="first"
              lastPageText="last"
              linkClass="page-link"
              itemClass="page-item"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
