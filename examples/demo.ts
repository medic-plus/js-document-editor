import { jEditor } from "~/main";
import { defaultPaperSizes } from "~/defaults";

import data from "examples/defaults/data";
import elements from "examples/defaults/elements";
import customActions from "examples/defaults/custom-actions";

const paperSize = defaultPaperSizes.find((size) => size.name === "A5");
const editor = new jEditor(
  {
    container: "#jEditor",
    paperSize: paperSize,
    elements: elements,
    title:
      "<a href='https://github.com/medic-plus/js-document-editor'>jEditor</a>",
    units: "in",
    zoomThreshold: 0.35,
    customToolbarActions: customActions,
  },
  data as EditorData[]
);
editor.showToast("Editor has been initialized");

declare global {
  interface Window {
    editor: JEditor;
  }
}
window.editor = editor;
