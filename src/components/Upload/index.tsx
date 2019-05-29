import "../../styles/index.scss";
import "../../styles/spacing.scss";

import { FluentCustomizations } from "@uifabric/fluent-theme";
import { Customizer, initializeIcons } from "office-ui-fabric-react";
import { Provider } from "outstated";
import React from "react";

import UploadStore from "../../stores/upload.store";
import Form from "./form";

export function Upload({ endpoint }) {
  initializeIcons();

  return (
    <Customizer {...FluentCustomizations}>
      <Provider stores={[UploadStore]}>
        <Form endpoint={endpoint} />
      </Provider>
    </Customizer>
  );
}
