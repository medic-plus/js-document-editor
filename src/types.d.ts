interface JEditor {
  render(): void;
  renderElements(): void;
  triggerChange(component: string, event: string): void;
  getSidebar(): EditorSideBar & EditorSection;
  getEditor(): EditorContainer & EditorSection;
  getToasts(): EditorToasts & EditorSection;
  getOptions(): EditorOptions;
  setOptions(options: EditorOptions): void;
  mergeOptions(options: any): EditorOptions;
  getData(): EditorData[];
  setData(data: EditorData[]): void;
  hasData(key: string): boolean;
  pushData(data: EditorData): void;
  pullData(key: string): EditorData;
  mergeData(key: string, data: any): EditorData;
  getElementData(key: string): EditorData | undefined;
  setPaperSize(paperName?: string, orientation?: string): void;
  showToast(message: string, className?: string, timeout?: number): void;
  setLocale(locale: Locale | string): void;
  getDefaultLocales(): Map<string, Locale>;
  setTheme(theme: string): void;
  getDefaultThemes(): string[];
}

interface EditorSection {
  getSection(): HTMLElement;
  render(): void;
}

interface EditorSideBar {
  renderToolbar(): void;
  renderElementsList(): void;
  renderCustomToolbar(): void;
  getToolbar(): HTMLElement;
  getElementsList(): HTMLElement;
  getCustomToolbar(): HTMLElement;
  getElementsListItem(key: string): HTMLElement | undefined;
  clickElementListItem(key: string): void;
  showElementListItem(key: string): void;
  hideElementListItem(key: string): void;
  toolbarAction(action: string): void;
  showDetails(key: string): void;
  hiddeDetails(): void;
}

interface EditorContainer {
  renderBanner(): void;
  renderElements(): void;
  getBanner(): HTMLElement;
  getPageWrapper(): HTMLElement;
  getPage(): HTMLElement;
  getActiveElement(): HTMLElement | undefined;
  setPaperSize(paperName?: string, orientation?: string): void;
  setZoom(value: number): void;
  zoomIn(): void;
  zoomOut(): void;
  resetZoom(): void;
  deselectActiveElement(): void;
  initResizableElements(selector: string, editorMode: boolean): void;
  initDraggableElements(selector: string, editorMode: boolean): void;
  getElementDetails(element: HTMLElement | string): ElementDetails;
  selectElement(key: string): void;
  setElementPosition(key: string | null, x?: number, y?: number): void;
  setElementCardinalPosition(
    key: string | null,
    position: string,
    value?: string
  ): void;
  setPageBackground(): void;
}

interface EditorToasts {
  addToast: (message: string, className?: string, timeout?: number) => void;
}

interface EditorOptions {
  alignButtons?: (UIElement & AlignButton)[];
  arrowStep?: number;
  arrowShiftStep?: number;
  background?: string | Background;
  container: string;
  customToolbarActions?: CustomToolbarAction[];
  customToolbarClassName?: string;
  decimals?: number;
  detailProperties?: UIElement[];
  dpi?: number;
  dragStep?: number;
  editorMode?: boolean;
  elements: EditorElement[];
  fontSize?: number;
  forceOrientation?: boolean;
  locale?: Locale | string;
  orientation?: "portrait" | "landscape";
  paperSize?: string;
  paperSizes?: PaperSize[];
  positionButtons?: (UIElement & PositionButton)[];
  positionButtonsClassName?: string;
  sidebarPosition?: "left" | "right";
  theme?: string;
  title?: string;
  toastDuration?: number;
  toolbarActions?: ToolbarAction[];
  units: string;
  zoom?: number;
  zoomIncrement?: number;
  zoomThreshold?: number;
  onChange: (editor: JEditor, component: string, event: string) => void | null;
  onSidebarChange: (
    editor: JEditor,
    event: string,
    data?: EditorData | string
  ) => void | null;
  onEditorChange: (
    editor: JEditor,
    event: string,
    data?: EditorData | string
  ) => void | null;
}

interface Locale {
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
  toggleEditor: string;
  paperSize: string;
  rotate: string;
  pageSizeChanged: string;
  portrait: string;
  landscape: string;
  width: string;
  height: string;
  top: string;
  left: string;
  fontSize: string;
  textAlign: string;
  placeholder: string;
  alignElement: string;
  vertical: string;
  horizontal: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  alignJustify: string;
}

interface ToolbarAction {
  name: string;
  label?: string;
  content: string;
  className?: string;
  hide: boolean;
}

interface CustomToolbarAction {
  content: string;
  tooltip?: string;
  className?: string;
  action(editor: JEditor): void;
}

interface PaperSize {
  name: string;
  displayName: string;
  description?: string;
  orientation: "portrait" | "landscape";
  width: number;
  height: number;
  default?: boolean;
}

interface EditorElement {
  key: string;
  text: string;
  value: string;
  width: number;
  height: number;
  align?: "left" | "center" | "right" | "justify";
  fontSize?: number;
  placeholder?: string;
  settings?: ElementSettings;
}

interface ElementSettings {
  align?: boolean;
  fontSize?: boolean;
  placeholder?: boolean;
}

interface EditorData {
  element: string;
  left: number;
  top: number;
  width: number;
  height: number;
  align?: string;
  fontSize?: number;
  placeholder?: string;
  value?: string;
}

interface ElementDetails {
  width: string;
  height: string;
  top: string;
  left: string;
}

interface Background {
  url: string;
  size?: string;
  repeat?: string;
  position?: string;
}

interface UIElement {
  icon?: any;
  value: string;
  localeText?: string;
  className?: string;
}

interface AlignButton {
  default?: boolean;
}

interface PositionButton {
  action(editor: JEditor, key: element): void;
}

interface IIndexable {
  [key: string]: any;
}
