import React from "react";
import ReactDOM from "react-dom/client";
import SourceSelector from "./components/_Modules/SourceSelector";
import SourceUploadButtons from "./components/_Modules/SourceUploadButtons";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SourceUploadButtons />
    <SourceSelector />
  </React.StrictMode>,
);

reportWebVitals(console.log);
