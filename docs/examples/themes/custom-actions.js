const setCustomTheme = (active) => {
  const themeTag = document.getElementById("theme");
  if (active) {
    themeTag.innerHTML = `[data-container="jeditor"][data-theme="custom"] {
      --primary-50: #fbf6f5;
      --primary-100: #f6ecea;
      --primary-200: #f0dcd8;
      --primary-300: #e4c3bd;
      --primary-400: #d3a096;
      --primary-500: #ba7264;
      --primary-600: #aa6558;
      --primary-700: #8e5347;
      --primary-800: #77463d;
      --primary-900: #643f38;
      --primary-950: #351e1a;
  }`;
  } else {
    themeTag.innerHTML = "";
  }
};

const setTheme = (editor, theme) => {
  customActions.forEach((action) => {
    action.className = `text-sm ${action.content.toLowerCase() === theme ? "bg-primary-500" : ""}`;
  });
  editor.mergeOptions({ customActions: customActions });
  editor.render();
  setCustomTheme(theme === "custom");
  editor.setTheme(theme);
};
export const customActions = [
  {
    action: (editor) => setTheme(editor, "default"),
    content: "Default",
    className: "text-sm bg-primary-500",
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
    action: (editor) => setTheme(editor, "custom"),
    content: "Custom",
    className: "text-sm",
  },
];
