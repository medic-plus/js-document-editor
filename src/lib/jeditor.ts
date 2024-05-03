import SideBar from "src/lib/components/sidebar";
import Editor from "src/lib/components/editor";
import { defaultEditorOptions } from "src/lib/defaults";
import { mergeDeep } from "src/lib/utils";
import Toasts from "src/lib/components/toasts";

export class jEditor implements JEditor {
  private _options: EditorOptions;
  private _data: EditorData[];
  private _sidebar: EditorSideBar & EditorSection;
  private _editor: EditorContainer & EditorSection;
  private _toasts: EditorToasts & EditorSection;

  constructor(options: EditorOptions, data: EditorData[]) {
    this._options = defaultEditorOptions;
    this.mergeOptions(options);
    this._data = data;
    this._sidebar = new SideBar(this);
    this._editor = new Editor(this);
    this._toasts = new Toasts(this);
    this.render();
  }

  render(): void {
    const container = document.querySelector(this._options.container);
    if (!container) {
      throw new Error("Container element does not exist in the DOM.");
    }
    container.className = "flex flex-col md:flex-row w-full h-full";
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

  setPaperSize(paperName?: string, orientation?: string): void {
    this._editor.setPaperSize(paperName, orientation);
  }

  showToast(message: string, className?: string, timeout?: number): void {
    this._toasts.addToast(message, className, timeout);
  }

  setZoom(value: number) {
    this._editor.setZoom(value);
  }
}
