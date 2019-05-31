import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Upload } from "../..";

const postfix = "/naksha/layer/uploadshp";

storiesOf("Upload", module).add("Upload", () => (
  <Upload
    endpoint={text(
      "Endpoint",
      process.env.STORYBOOK_ENDPOINT + postfix || "https://example.com"
    )}
  />
));
