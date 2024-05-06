// import { jEditor } from "src/index";

import { data } from "./defaults/data.js";
import { elements } from "./defaults/elements.js";
import { customActions, unsavedChanges } from "./defaults/custom-actions.js";

const editor = new jEditor(
  {
    container: "#jEditor",
    paperSize: "half-letter",
    elements: elements,
    title: `<a href='https://github.com/medic-plus/js-document-editor'>jEditor</a>`,
    units: "in",
    zoomThreshold: 0.15,
    customToolbarActions: customActions,
    onChange: (editor) => {
      const action = customActions.find((c) => c.content === "Save");
      action.className = "text-sm bg-primary-500";
      editor.getSidebar().renderCustomToolbar();
      window.addEventListener("beforeunload", unsavedChanges);
    },
  },
  data
);
editor.showToast("Editor has been initialized");
window.editor = editor;
