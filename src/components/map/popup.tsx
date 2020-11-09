import { Box } from "@chakra-ui/core";
import React from "react";
import { Popup } from "react-map-gl";

interface IPopupContainerProps {
  data;
  set;
  closeButton?: boolean;
}

const VectorLayerInfo = React.memo(function(props: any) {
  return (
    <>
      <Box fontWeight="bold" color="blue.500">
        {props.layerId}
      </Box>
      <small style={{ zIndex: 999 }}>
        <table>
          <tbody>
            {props.feature.map(([k, v]) => (
              <tr key={k}>
                <td>
                  <b>{k}</b>
                </td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </small>
    </>
  );
});

export default function PopupContainer({
  data: { element: Element, lngLat, ...rest },
  set,
  closeButton = true
}: IPopupContainerProps) {
  return Element ? (
    <Popup
      onClose={() => set(null)}
      closeButton={closeButton}
      closeOnClick={false}
      latitude={lngLat[1]}
      longitude={lngLat[0]}
    >
      {Element === 1 ? <VectorLayerInfo {...rest} /> : <Element {...rest} />}
    </Popup>
  ) : null;
}
