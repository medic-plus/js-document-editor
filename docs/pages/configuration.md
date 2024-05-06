---
title: Configuration
---

You can extend and change some of the behavior of the editor

- [Modifying the options](#options)
- [Changing the locale](#localization)
- [Setting themes](#themes)

## Options

You can change any of the options when defining the editor or using the `setOptions` and `mergeOptions` functions.

```typescript
// Send options on initalization
const myOptions = {
    container: '#myEditor',
    elements: [],
    ...
}
const myEditor = new jEditor(myOptions, myData);

// You can also use the internal functions  to work with
// the configuration options
myEditor.getOptions();

// This will change the `myOptions` values and set new ones
myEditor.setOptions(myOtherOptions);

// This will merge the existing values from `myOptions`
// and override them only if they exist in `myOtherOptions`
myEditor.setOptions(myOtherOptions);
```

You can check all the interface types definition on [`types.d.ts`](https://github.com/medic-plus/js-document-editor/blob/main/src/types.d.ts)

| Option                                            | Default Value                                                         | Description                                                                           |
| ------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| alignButtons: `(UIElement & AlignButton)[]`       | [`alignButtons`](#default-align-buttons)                              | An array of custom alignment buttons to be displayed in the toolbar.                  |
| arrowStep: `number`                               | 1                                                                     | The `pixel` value for each arrow key movement of an element.                          |
| arrowShiftStep: `number`                          | 10                                                                    | The `pixel` value for each arrow key movement with the Shift key held down.           |
| background: `string` \| `Background`              | undefined                                                             | Background property or URL that will be set for the `page` component.                 |
| container: `string`                               | **required**                                                          | The `CSS selector` of the DOM element that will contain the editor.                   |
| customToolbarActions: `CustomToolbarAction[]`     | []                                                                    | An array of toolbar actions to be displayed in the custom toolbar.                    |
| customToolbarClassName: `string`                  | undefined                                                             | A custom `CSS class name` to be applied to the custom toolbar container.              |
| decimals: `number`                                | 2                                                                     | The number of decimal places to display for element dimensions and positions.         |
| detailProperties: `UIElement[]`                   | [`defaultProperties`](#default-properties)                            | An array of custom properties to be displayed in the element details content.         |
| dpi: `number`                                     | 150                                                                   | The `dots-per-inch` value for the editor.                                             |
| dragStep: `number`                                | 1                                                                     | The `pixel` value for each drag movement of an element.                               |
| editorMode: `boolean`                             | true                                                                  | Enables editing mode to modify, resize and drag elements.                             |
| elements: `EditorElement[]`                       | **required**                                                          | An array of initial elements to be displayed in the editor.                           |
| fontSize: `number`                                | 16                                                                    | The default font size for elements in `pixels`.                                       |
| forceOrientation: `boolean`                       | false                                                                 | Change to paper `orientation` on paper size change                                    |
| locale: `Locale` \| 'string'                      | 'en_US'                                                               | The locale object defining language formatting.                                       |
| orientation: `"portrait"` \| `"landscape"`        | 'portrait'                                                            | The initial paper orientation.                                                        |
| paperSize: `string`                               | 'letter'                                                              | The initial paper size (e.g., `letter`, `A4`).                                        |
| paperSizes: `PaperSize[]`                         | [`defaultPaperSizes`](#default-paper-sizes)                           | An array of custom paper sizes to be displayed in the paper size dropdown.            |
| positionButtons: `(UIElement & PositionButton)[]` | [`centerPositionButtons`](#default-position-buttons)                  | An array of custom position buttons to be displayed in the toolbar.                   |
| positionButtonsClassName: `string`                | 'grid-cols-2'                                                         | A custom `CSS class name` to be applied to the position buttons container.            |
| sidebarPosition: `"left"` \| `"right"`            | 'left'                                                                | The position of the sidebar container (`left` or `right`).                            |
| theme: `string`                                   | 'default'                                                             | The editor style theme (`default`, `green`, `pink`, `teal`, or any custom theme ).    |
| title: `string`                                   | 'jEditor'                                                             | The title displayed in the editor banner (can be HTML code in string format).         |
| toastDuration: `number`                           | 3000                                                                  | The default duration in `milliseconds` for displaying toast notifications.            |
| toolbarActions: `ToolbarAction[]`                 | [`defaultToolbarActions`](#default-toolbar-actions)                   | An array of built-in toolbar actions to be displayed.                                 |
| units: `string`                                   | "in"                                                                  | The unit system for element dimensions (pixels, inches, centimeters, millimeters).    |
| zoom: `number`                                    | 100                                                                   | The initial zoom level for the editor content (`percentage`).                         |
| zoomIncrement: `number`                           | 10                                                                    | The amount to increase or decrease the zoom level with zoom buttons.                  |
| zoomThreshold: `number`                           | 0.3                                                                   | This substracts from `(wrapperWidth / pageWidth)` in the `resetZoom` function.        |
| onChange: `function`                              | (editor: JEditor, component: string, event: string) => void           | A callback function triggered when the editor content changes.                        |
| onSidebarChange: `function`                       | (editor: JEditor, event: string, data?: EditorData \| string) => void | A callback when something is modified on the sidebar component (Triggers `onChange`). |
| onEditorChange: `function`                        | (editor: JEditor, event: string, data?: EditorData \| string) => void | A callback when something is modified on the editor component (Triggers `onChange`).  |

### Localization

The editor comes configured with 7 locales (may need some validation): `de_ED`, `en_US`, `es_ES`, `fr_FR`, `it_IT`, and `zh_CN`.

```typescript
// As an option when creating the editor
const myEditor = new jEditor({..., locale: 'fr_FR'});

// After it has been initialized
myEditor.setLocale('it_IT');
// You will need to re-render the editor to apply the changes
myEditor.render();
```

#### Custom locale

If you need to use a custom locale, you can define a `Locale` (see [`types.d.ts`](https://github.com/medic-plus/js-document-editor/blob/main/src/types.d.ts)) object and put it on the `locale` option.

```typescript
export const myLocale: Locale = {
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  zoomReset: "Zoom reset",
  toggleEditor: "Toggle edition mode",
  paperSize: "Change paper size",
  rotate: "Rotate page",
  pageSizeChanged: "Paper size: ",
  portrait: "Portrait",
  landscape: "Landscape",
  width: "Width",
  height: "Height",
  top: "Top",
  left: "Left",
  fontSize: "Font size",
  textAlign: "Text align",
  placeholder: "Placeholder",
  alignElement: "Align element",
  vertical: "Vertical",
  horizontal: "Horizontal",
  alignLeft: "Left",
  alignCenter: "Center",
  alignRight: "Right",
  alignJustify: "Justify",
};

const myEditor = new jEditor({..., locale: myLocale});
```

### Themes

The editor comes configured with 4 locales: `default`, `green`, `pink`, and `teal`.

```typescript
// As an option when creating the editor
const myEditor = new jEditor({..., theme: 'teal'});

// After it has been initialized
myEditor.setTheme('pink');
```

#### Custom theme

You can create your own custom theme by defining a CSS with the selector `[data-theme="my-custom-theme]`, you can use [this tool](https://uicolors.app/create) to create the colors for your theme.

```css
[data-container="jeditor"][data-theme="my-custom-theme"] {
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
}
```

And then calling:

```typescript
/* 
This will show a warning to let you know you are using a custom theme
and must have your CSS styles loaded to make it work.
*/
myEditor.setTheme("my-custom-theme");
```

### Defaults

By default, the editor will contain some values for the options so you can start using it without having to manually set all functions, you can change these options and extend the editor as you like.

#### Default Properties

```typescript
export const detailProperties: UIElement[] = [
  { value: "width", icon: faArrowsLeftRight, localeText: "width" },
  { value: "height", icon: faArrowsUpDown, localeText: "height" },
  { value: "top", icon: faArrowUp, localeText: "top" },
  { value: "left", icon: faArrowLeft, localeText: "left" },
];
```

#### Default Align Buttons

```typescript
export const alignButtons: (UIElement & AlignButton)[] = [
  { value: "left", icon: faAlignLeft, localeText: "alignLeft", default: true },
  { value: "center", icon: faAlignCenter, localeText: "alignCenter" },
  { value: "right", icon: faAlignRight, localeText: "alignRight" },
  { value: "justify", icon: faAlignJustify, localeText: "alignJustify" },
];
```

#### Default Paper Sizes

```typescript
export const defaultPaperSizes: PaperSize[] = [
  {
    name: "letter",
    displayName: "Letter",
    description: "8.5in x 11in",
    orientation: "portrait",
    width: 1275,
    height: 1650,
    default: true,
  },
  {
    name: "half-letter",
    displayName: "Half Letter",
    description: "5.5in x 8.5in",
    orientation: "portrait",
    width: 825,
    height: 1275,
  },
  {
    name: "legal",
    displayName: "Legal",
    description: "8.5in x 14in",
    orientation: "portrait",
    width: 1275,
    height: 2100,
  },
  {
    name: "tabloid",
    displayName: "Tabloid",
    description: "11in x 17in",
    orientation: "portrait",
    width: 1650,
    height: 2550,
  },
  {
    name: "a3",
    displayName: "A3",
    description: "11.7in x 16.5in",
    orientation: "portrait",
    width: 1754,
    height: 2480,
  },
  {
    name: "a4",
    displayName: "A4",
    description: "8.3in x 11.7in",
    orientation: "portrait",
    width: 1240,
    height: 1754,
  },
  {
    name: "a5",
    displayName: "A5",
    description: "5.8in x 8.3in",
    orientation: "portrait",
    width: 874,
    height: 1240,
  },
];
```

#### Default Position Buttons

```typescript
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
```

#### Default Toolbar Actions

```typescript
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
```
