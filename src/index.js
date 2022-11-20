import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

import MixerTemplate from "./components/_Templates/MixerTemplate";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MixerTemplate />
  </React.StrictMode>,
);

reportWebVitals(console.log);
