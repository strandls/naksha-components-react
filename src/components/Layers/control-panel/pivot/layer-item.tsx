import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Image } from "office-ui-fabric-react/lib/Image";
import React from "react";

import { ENDPOINT_GEOSERVER } from "../../../../utils/constants";

export default function LayerItem({
  item,
  selectedLayersNames,
  setSelectedLayers,
  endpoint
}) {
  return (
    <div className="layers--layer py-2" key={item.id}>
      <Checkbox
        className="mr-1"
        defaultChecked={selectedLayersNames.includes(item.name)}
        onChange={(e, isChecked) => setSelectedLayers(item, isChecked)}
      />
      <Image
        className="thumb mr-2"
        src={`${endpoint + ENDPOINT_GEOSERVER}/thumbnails/${
          item.name
        }_thumb.gif`}
        width={50}
        height={50}
      />
      <div>
        <span className="title">{item.title}</span>
        <p className="pt-1 pb-0">{item.abstract}</p>
      </div>
    </div>
  );
}
