import { defaultLocale } from "src/lib/defaults";

export default class Component {
  _parent: JEditor;

  constructor(parent: JEditor) {
    this._parent = parent;
  }

  getEditor(): EditorContainer {
    return this._parent.getEditor();
  }
  getSidebar(): EditorSideBar {
    return this._parent.getSidebar();
  }

  getOptions(): EditorOptions {
    return this._parent.getOptions();
  }

  getLocale(): Locale | undefined {
    return this.getOptions().locale;
  }

  getData(): EditorData[] {
    return this._parent.getData();
  }

  getLocalizedText(entry?: string): string {
    if (!entry) {
      return "";
    }
    let locale = this._parent.getOptions().locale;
    locale = locale ?? defaultLocale;
    return (locale as IIndexable)[entry] ?? entry;
  }

  getEditorMode(): boolean {
    return this._parent.getOptions().editorMode ?? false;
  }
}
