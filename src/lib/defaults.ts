import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faFile,
  faRotate,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faExpandArrowsAlt,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faArrowsLeftRight,
  faArrowsUpDown,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
  faArrowRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { en_US } from "src/locales/en_US";
import { locales } from "src/locales/locales";

export const defaultPaperSizes: PaperSize[] = [
  {
    name: "letter",
    displayName: "Letter",
    description: "8.5in x 11in",
    width: 1275,
    height: 1650,
    default: true,
  },
  {
    name: "half-letter",
    displayName: "Half Letter",
    description: "8.5in x 5.5in",
    width: 1275,
    height: 825,
    default: false,
  },
  {
    name: "legal",
    displayName: "Legal",
    description: "8.5in x 14in",
    width: 1275,
    height: 2100,
    default: false,
  },
  {
    name: "tabloid",
    displayName: "Tabloid",
    description: "11in x 17in",
    width: 1650,
    height: 2550,
    default: false,
  },
  {
    name: "a3",
    displayName: "A3",
    description: "11.7in x 16.5in",
    width: 1754,
    height: 2480,
    default: false,
  },
  {
    name: "a4",
    displayName: "A4",
    description: "8.3in x 11.7in",
    width: 1240,
    height: 1754,
    default: false,
  },
  {
    name: "a5",
    displayName: "A5",
    description: "5.8in x 8.3in",
    width: 874,
    height: 1240,
    default: false,
  },
];

export const defaultToolbarActions: ToolbarAction[] = [
  {
    name: "toggleEditor",
    content: icon(faEdit).html.toString(),
    hide: false,
  },
  {
    name: "paperSize",
    content: icon(faFile).html.toString(),
    hide: false,
  },
  {
    name: "rotate",
    content: icon(faRotate).html.toString(),
    hide: false,
  },
  {
    name: "zoomOut",
    content: icon(faMagnifyingGlassMinus).html.toString(),
    hide: false,
  },
  {
    name: "zoomIn",
    content: icon(faMagnifyingGlassPlus).html.toString(),
    hide: false,
  },
  {
    name: "zoomReset",
    content: icon(faExpandArrowsAlt).html.toString(),
    hide: false,
  },
];

export const centerPositionButtons: (UIElement & PositionButton)[] = [
  {
    value: "vertical",
    localeText: "vertical",
    className: "text-sm",
    action: (jEditor: JEditor, key: string): void => {
      jEditor.getEditor().setElementCardinalPosition(key, "c", "vertical");
    },
  },
  {
    value: "horizontal",
    localeText: "horizontal",
    className: "text-sm",
    action: (jEditor: JEditor, key: string): void => {
      jEditor.getEditor().setElementCardinalPosition(key, "c", "horizontal");
    },
  },
];

export const cardinalPositionButtons: (UIElement & PositionButton)[] = [
  {
    value: "nw",
    icon: faArrowUp,
    className: "text-sm -rotate-45",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "nw"),
  },
  {
    value: "n",
    icon: faArrowUp,
    className: "text-sm",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "n"),
  },
  {
    value: "ne",
    icon: faArrowUp,
    className: "text-sm rotate-45",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "ne"),
  },
  {
    value: "w",
    icon: faArrowLeft,
    className: "text-sm",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "w"),
  },
  {
    value: "c",
    icon: faCircle,
    className: "text-sm",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "c"),
  },
  {
    value: "e",
    icon: faArrowRight,
    className: "text-sm",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "e"),
  },
  {
    value: "sw",
    icon: faArrowDown,
    className: "text-sm rotate-45",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "sw"),
  },
  {
    value: "s",
    icon: faArrowDown,
    className: "text-sm",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "s"),
  },
  {
    value: "se",
    icon: faArrowDown,
    className: "text-sm -rotate-45",
    action: (jEditor: JEditor, key: string): void =>
      jEditor.getEditor().setElementCardinalPosition(key, "se"),
  },
];

export const alignButtons: (UIElement & AlignButton)[] = [
  { value: "left", icon: faAlignLeft, localeText: "alignLeft", default: true },
  { value: "center", icon: faAlignCenter, localeText: "alignCenter" },
  { value: "right", icon: faAlignRight, localeText: "alignRight" },
  { value: "justify", icon: faAlignJustify, localeText: "alignJustify" },
];

export const detailProperties: UIElement[] = [
  { value: "width", icon: faArrowsLeftRight, localeText: "width" },
  { value: "height", icon: faArrowsUpDown, localeText: "height" },
  { value: "top", icon: faArrowUp, localeText: "top" },
  { value: "left", icon: faArrowLeft, localeText: "left" },
];

export const allowEventListener = ["button", "input"];

export const defaultLocale: Locale = en_US;

export const defaultLocales: Map<string, Locale> = locales;

export const defaultThemes: string[] = ["default", "green", "pink", "teal"];

export const defaultEditorOptions: EditorOptions = {
  alignButtons: alignButtons,
  arrowStep: 1,
  arrowShiftStep: 10,
  container: "#jEditor",
  customToolbarActions: [],
  decimals: 2,
  detailProperties: detailProperties,
  dpi: 150,
  dragStep: 1,
  editorMode: true,
  elements: [],
  fontSize: 16,
  locale: "en_US",
  orientation: "portrait",
  paperSizes: defaultPaperSizes,
  positionButtons: centerPositionButtons,
  positionButtonsClassName: "grid-cols-2",
  theme: "default",
  toastDuration: 3000,
  toolbarActions: defaultToolbarActions,
  sidebarPosition: "right",
  units: "in",
  zoom: 100,
  zoomIncrement: 10,
  zoomThreshold: 0.1,
  onChange: () => {},
  onEditorChange: () => {},
  onSidebarChange: () => {},
};
