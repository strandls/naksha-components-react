import { bBoxAspectRatio, calculateSize } from "bbox-aspect-ratio";
import { Checkbox, Image } from "office-ui-fabric-react";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";

import { ENDPOINT_GEOSERVER } from "../../../../utils/constants";

export default function LayerItem({
  item,
  selectedLayersNames,
  setSelectedLayers,
  endpoint,
  searchWords
}) {
  const CHAR_LIMIT = 150;
  const [truncated, setTruncated] = useState(true);
  const abstract = item.abstract || "";

  const toggleTruncate = e => {
    e.preventDefault();
    setTruncated(!truncated);
  };

  const getThumbUrl = item => {
    return `${endpoint + ENDPOINT_GEOSERVER}/thumbnails/biodiv/${
      item.name
    }?bbox=${item.bbox[0].toString()},${item.bbox[1].toString()}&width=50&height=${calculateSize(
      bBoxAspectRatio(item.bbox.flat()),
      50
    )}&srs=EPSG:4326`;
  };

  return (
    <div className="layers--layer py-2" key={item.id}>
      <Checkbox
        className="mr-1"
        defaultChecked={selectedLayersNames.includes(item.name)}
        onChange={(e, isChecked) => setSelectedLayers(e, item, isChecked)}
      />
      <Image className="thumb mr-2" src={getThumbUrl(item)} />
      <div>
        <span className="title">
          <Highlighter
            searchWords={searchWords}
            autoEscape={true}
            textToHighlight={item.title}
          />
        </span>
        <p className="pt-1 pb-0">
          <Highlighter
            searchWords={searchWords}
            autoEscape={true}
            textToHighlight={abstract.substr(
              0,
              truncated ? CHAR_LIMIT : abstract.length
            )}
          />
          {abstract.length > CHAR_LIMIT && (
            <>
              {truncated ? "..." : ""}
              <a href="#" className="more-less" onClick={toggleTruncate}>
                {truncated ? "More" : "Less"}
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
