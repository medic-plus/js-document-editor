import { defaultLocale, defaultLocales } from "src/lib/defaults";

export default class Component {
  _parent: JEditor;
  _rendered: boolean = false;

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
    const locale = this.getOptions().locale;
    if (typeof locale === "string") {
      return defaultLocales.get(locale);
    }
    return locale;
  }

  getData(): EditorData[] {
    return this._parent.getData();
  }

  hasData(key: string): boolean {
    return this._parent.hasData(key);
  }

  mergeData(key: string, data: any): EditorData {
    return this._parent.mergeData(key, data);
  }

  getLocalizedText(entry?: string): string {
    if (!entry) {
      return "";
    }
    let locale = this.getLocale();
    locale = locale ?? defaultLocale;
    return (locale as IIndexable)[entry] ?? entry;
  }

  getEditorMode(): boolean {
    return this._parent.getOptions().editorMode ?? false;
  }

  triggerParent(component: string, event: string) {
    return this._parent.triggerChange(component, event);
  }
}
