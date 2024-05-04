import SideBar from "src/lib/components/sidebar";
import Editor from "src/lib/components/editor";
import { defaultEditorOptions, defaultLocales } from "src/lib/defaults";
import { mergeDeep } from "src/lib/utils";
import Toasts from "src/lib/components/toasts";

export class jEditor implements JEditor {
  private _options: EditorOptions;
  private _data: EditorData[];
  private _sidebar: EditorSideBar & EditorSection;
  private _editor: EditorContainer & EditorSection;
  private _toasts: EditorToasts & EditorSection;
  private _rendered: boolean = false;

  constructor(options: EditorOptions, data: EditorData[]) {
    this._data = data;
    this._options = defaultEditorOptions;
    this.mergeOptions(options);
    this.render();
    this._sidebar = new SideBar(this);
    this._toasts = new Toasts(this);
    this._editor = new Editor(this);
    this._editor.resetZoom();
  }

  render(): void {
    const container = document.querySelector(this._options.container);
    if (!container) {
      throw new Error(
        `HTML tag with selector "${this._options.container}" does not exist on the DOM.`
      );
    }
    const flexDirection = `${this._options.sidebarPosition === "left" ? "md:flex-row" : "md:flex-row-reverse"}`;
    container.className = `flex flex-col ${flexDirection} w-full h-full`;
    if (this._rendered) {
      container.innerHTML = "";
      this._sidebar = new SideBar(this);
      this._editor = new Editor(this);
      this._toasts = new Toasts(this);
    }
    this._rendered = true;
  }

  renderElements(): void {
    this._editor.renderElements();
  }

  getSidebar(): EditorSideBar & EditorSection {
    return this._sidebar;
  }

  getEditor(): EditorContainer & EditorSection {
    return this._editor;
  }

  getToasts(): EditorToasts & EditorSection {
    return this._toasts;
  }

  getOptions(): EditorOptions {
    return this._options;
  }

  setOptions(options: EditorOptions): void {
    this._options = options;
  }

  mergeOptions(options: any): EditorOptions {
    this.setOptions(mergeDeep(this.getOptions(), options));
    return this.getOptions();
  }

  getData(): EditorData[] {
    return this._data;
  }

  setData(data: EditorData[]): void {
    this._data = data;
  }

  private getDataIndex(key: string): number {
    return this._data.findIndex((d) => d.element === key);
  }

  hasData(key: string): boolean {
    return this.getDataIndex(key) !== -1;
  }

  pushData(data: EditorData): void {
    if (!data.element) {
      throw new Error(`No "element" property was found on the data provided`);
    }
    if (this.hasData(data.element)) {
      throw new Error(
        `Data for element "${data.element}" already exists, use mergeData(key, data) instead`
      );
    }
    this._data.push(data);
  }

  pullData(key: string): EditorData {
    if (!this.hasData(key)) {
      throw new Error(`Data for element "${key}" was not found`);
    }
    const data = this._data.splice(this.getDataIndex(key), 1);
    return data[0];
  }

  mergeData(key: string, data: any): EditorData {
    let modifiedData;
    if (!this.hasData(key)) {
      modifiedData = mergeDeep({ element: key }, data);
    } else {
      const removedData = this.pullData(key);
      modifiedData = mergeDeep(removedData, data);
    }
    this.pushData(modifiedData);
    return modifiedData;
  }

  getElementData(key: string): EditorData | undefined {
    if (this.hasData(key)) {
      return this._data[this.getDataIndex(key)];
    }
    return undefined;
  }

  setPaperSize(paperName?: string, orientation?: string): void {
    this._editor.setPaperSize(paperName, orientation);
  }

  showToast(message: string, className?: string, timeout?: number): void {
    this._toasts.addToast(message, className, timeout);
  }

  setZoom(value: number) {
    if (value <= 0) {
      throw new Error(`Zoom value has to be greater than zero`);
    }
    this.mergeOptions({ zoom: value });
    this._editor.setZoom(value);
  }

  setLocale(locale: string | Locale) {
    const newLocale =
      typeof locale === "string" ? defaultLocales.get(locale) : locale;
    if (!newLocale) {
      const keys = Array.from(defaultLocales.keys()).join(", ");
      throw new Error(
        `Locale "${locale}" was not found, you can set your own locale or use any of: ${keys}`
      );
    }
    this.mergeOptions({ locale: newLocale });
    this.render();
  }

  getDefaultLocales(): Map<string, Locale> {
    return defaultLocales;
  }
}
