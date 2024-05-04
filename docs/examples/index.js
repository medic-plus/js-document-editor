// import { jEditor } from "src/index";

import data from "./defaults/data.js";
import elements from "./defaults/elements.js";
import customActions from "./defaults/custom-actions.js";

const editor = new jEditor(
  {
    container: "#jEditor",
    paperSize: "half-letter",
    elements: elements,
    title: `<a href='https://github.com/medic-plus/js-document-editor'>jEditor</a>`,
    units: "in",
    zoomThreshold: 0.15,
    customToolbarActions: customActions,
  },
  data
);
editor.showToast("Editor has been initialized");
window.editor = editor;
