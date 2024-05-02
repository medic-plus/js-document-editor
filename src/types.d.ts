interface JEditor {
  render(): void;
  renderElements(): void;
  getSidebar(): EditorSideBar & EditorSection;
  getEditor(): EditorContainer & EditorSection;
  getToasts(): EditorToasts & EditorSection;
  getOptions(): EditorOptions;
  setOptions(options: EditorOptions): void;
  mergeOptions(options: any): EditorOptions;
  getData(): EditorData[];
  // setData(data: EditorData): void;
  // mergeData(data: any): EditorData;
  setPaperSize(paperSize: PaperSize, orientation?: string): void;
  showToast(message: string, className?: string, timeout?: number);
}

interface EditorSection {
  getSection(): HTMLElement;
  render(): void;
}

interface EditorSideBar {
  renderToolbar(): void;
  renderElementsList(): void;
  getToolbar(): HTMLElement;
  getElementsList(): HTMLElement;
  getElementsListItem(key: string): HTMLElement | undefined;
  clickElementListItem(key: string): void;
  showElementListItem(key: string): void;
  hideElementListItem(key: string): void;
  toolbarAction(action: string): void;
  showDetails(key: string): void;
  hiddeDetails(): void;
  detailsAction(key: string, action: string): void;
}

interface EditorContainer {
  renderBanner(): void;
  getBanner(): HTMLElement;
  getPageWrapper(): HTMLElement;
  getPage(): HTMLElement;
  getActiveElement(): HTMLElement | undefined;
  setPaperSize(paperSize?: PaperSize, orientation?: string): void;
  setZoom(value: number): void;
  zoomIn(): void;
  zoomOut(): void;
  resetZoom(): void;
  renderElements(): void;
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
}

interface EditorToasts {
  addToast: (message: string, className?: string, timeout?: number) => void;
}

interface EditorOptions {
  container: string;
  title?: string;
  zoom?: number;
  zoomIncrement?: number;
  locale?: Locale;
  orientation?: string;
  elements: EditorElement[];
  paperSize?: PaperSize;
  paperSizes?: PaperSize[];
  toolbarActions?: ToolbarAction[];
  customToolbarActions?: CustomToolbarAction[];
  detailProperties?: UIElement[];
  alignButtons?: (UIElement & AlignButton)[];
  positionButtons?: (UIElement & PositionButton)[];
  positionButtonsClassName?: string;
  toastDuration?: number;
  editorMode?: boolean;
  units: string;
  decimals?: number;
  dpi?: number;
  zoomThreshold?: number;
  dragStep?: number;
  arrowStep?: number;
  arrowShiftStep?: number;
  fontSize?: number;
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
  className?: string;
  action(editor: JEditor): void;
}

interface PaperSize {
  name: string;
  displayName?: string;
  description?: string;
  width: number;
  height: number;
  default: boolean;
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
  action(editor: JEditor): void;
}

interface IIndexable {
  [key: string]: any;
}
