const customActions = [
  {
    action: (editor) => {},
    content: "Default View",
    className: "text-sm",
  },
  {
    action: (editor) => {},
    content: "Clear Background",
    className: "text-sm",
  },
  {
    action: (editor) => {
      console.log("Editor Data: ", editor.getData());
      editor.showToast(
        "Data has been saved! <div class='text-sm'>Check your browser console.</div>"
      );
    },
    content: '<span class="fa fa-save"></span> Save',
    className: "text-sm bg-primary-500",
  },
];

export default customActions;
