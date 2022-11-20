import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

import SourceController from "./components/_Modules/SourceController";
import CuttedAudioController from "./components/_Modules/CuttedAudioController";
import MixedAuidoController from "./components/_Modules/MixedAuidoController";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <SourceController />
    <CuttedAudioController />
    <MixedAuidoController />
  </React.StrictMode>,
);

reportWebVitals(console.log);
