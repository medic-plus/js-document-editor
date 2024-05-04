const setTheme = (editor, theme) => {
  customActions.forEach((action) => {
    action.className = `text-sm ${action.content.toLowerCase() === theme ? "bg-primary-500" : ""}`;
  });
  editor.mergeOptions({ customActions: customActions });
  editor.render();
  editor.setTheme(theme);
};
export const customActions = [
  {
    action: (editor) => setTheme(editor, "default"),
    content: "Default",
    className: "text-sm",
  },
  {
    action: (editor) => setTheme(editor, "green"),
    content: "Green",
    className: "text-sm",
  },
  {
    action: (editor) => setTheme(editor, "pink"),
    content: "Pink",
    className: "text-sm",
  },
  {
    action: (editor) => setTheme(editor, "teal"),
    content: "Teal",
    className: "text-sm",
  },
  {
    action: (editor) => setTheme(editor, "first"),
    content: "First",
    className: "text-sm bg-primary-500",
  },
  {
    action: (editor) => setTheme(editor, "second"),
    content: "Second",
    className: "text-sm",
  },
  {
    action: (editor) => setTheme(editor, "third"),
    content: "Third",
    className: "text-sm",
  },
  {
    action: (editor) => setTheme(editor, "fourth"),
    content: "Fourth",
    className: "text-sm",
  },
];
