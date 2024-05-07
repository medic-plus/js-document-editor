import { data } from "./data.js";

export const unsavedChanges = (event) => {
  event.preventDefault();
};

export const loadBackgroundImage = (element, editor) => {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    editor.mergeOptions({
      background: {
        url: reader.result,
        repeat: "repeat",
        size: "cover",
        position: "0px center",
      },
    });
    editor.getEditor().setPageBackground();
  };
  reader.readAsDataURL(file);
};

export const customActions = [
  {
    action: (editor) => {
      editor.setData([...data]);
      editor.render();
    },
    content: "Reset Elements",
    className: "text-sm",
  },
  {
    action: (editor) => {
      const element = document.querySelector("#inputBackground");
      element.removeEventListener("change", () =>
        loadBackgroundImage(element, editor)
      );
      element.addEventListener("change", () =>
        loadBackgroundImage(element, editor)
      );
      element.click();
    },
    content: "Background",
    className: "text-sm",
  },
  {
    action: (editor) => {
      console.log("Editor Data: ", editor.getData());
      editor.showToast(
        "Data has been saved! <div class='text-sm'>Check your browser console.</div>"
      );
      const toolbarActions = editor.getOptions().customToolbarActions;
      if (toolbarActions) {
        const action = toolbarActions.find((c) => c.content === "Save");
        action.className = "text-sm";
        editor.getSidebar().renderCustomToolbar();
        window.removeEventListener("beforeunload", unsavedChanges);
      }
    },
    content: "Save",
    className: "text-sm",
  },
];
