import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Upload } from "../..";

storiesOf("Upload", module).add("Upload", () => (
  <Upload
    endpoint={text(
      "Endpoint",
      process.env.STORYBOOK_ENDPOINT || "https://indiabiodiversity.org"
    )}
  />
));
