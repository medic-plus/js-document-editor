import { jEditor } from "src/lib/jeditor";
import "src/themes/default.scss";
import "src/styles.scss";

declare global {
  interface Window {
    jEditor?: any;
  }
}

if (typeof window !== "undefined") {
  window.jEditor = jEditor;
}

export { jEditor };
