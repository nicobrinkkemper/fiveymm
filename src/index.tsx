import "./index.css";
import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { hydrate, render } from "react-dom";
import * as FullStory from "@fullstory/browser";
import TagManager from "react-gtm-module";
import { production, snap } from "environment";
import { AppWrapper } from "AppWrapper";

const tagManagerArgs = {
  gtmId: "G-J20RKJ4B98"
};

const rootElement = document.getElementById("root");
const AppJSX = (
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
if (rootElement?.hasChildNodes()) {
  hydrate(AppJSX, rootElement);
} else {
  render(AppJSX, rootElement);
}

if (production && snap) {
  TagManager.initialize(tagManagerArgs);
  FullStory.init({ orgId: "W54CA", namespace: "FS" });
  reportWebVitals();
}
