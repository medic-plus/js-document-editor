import { jEditor } from "src/index";

import data from "./defaults/data";
import elements from "./defaults/elements";
import customActions from "./defaults/custom-actions";

const editor = new jEditor(
  {
    container: "#jEditor",
    paperSize: "half-letter",
    elements: elements,
    title:
      "<a href='https://github.com/medic-plus/js-document-editor'>jEditor</a>",
    units: "in",
    zoomThreshold: 0.35,
    customToolbarActions: customActions,
  },
  data
);
editor.showToast("Editor has been initialized");

window.editor = editor;
