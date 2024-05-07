---
title: Migrate from v2.x
---

A major redesign of the library has been made on version 3, which requires some changes when moving from the previous version.

### Editor initialization

With jEditor v2.x you had to define a single editor instance and also add FontAwesome libraries.

```javascript
// <div class="jEditor"></div>

import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "@fortawesome/fontawesome-free/scss/regular.scss";
import "@fortawesome/fontawesome-free/scss/solid.scss";
import jEditor from "@medic-plus/js-document-editor/dist/js/jeditor";

const data = [];
const options = { data };
$.jEditor(options);

// You cannot have multiple editors on the same page
const options2 = { data };
$.jEditor(options2); // Error "A variable _jeditor has already been created"
```

Now with jEditor v3.x, you can initialize multiple instances on the same site, and FontAwesome icons are already included (you will need to import them if want to customize the UI).

```javascript
//  CSS class `jEditor` is not required
// <div id="myEditor"></div>

// FontAwesome is not required
import { jEditor } from "@medic-plus/js-document-editor";

const options = { container: "#myEditor", elements: [], units: "in" };
const data = [];
const myEditor = new jEditor(options, data);

// Now you can have multiple editors in the same page
const options2 = { container: ".myOtherEditor", elements: [], units: "cm" };
const data2 = [];
const myOtherEditor = new jEditor(options2, data2);
```

### Options

Some of the options have been renamed or have changed significally, here are the details of what changed:

| Option v2.x        | Type v2.x            | Option v3.x            | Type v3.x                        | Notes                                                                |
| ------------------ | -------------------- | ---------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `background`       | String: null         | `background`           | String:undefined                 |                                                                      |
| `container`        | String: ".jEditor"   | `container`            | String:required                  | Required without default value                                       |
| `data`             | Array: []            | \-                     | \-                               | Moved as second parameter in jEditor                                 |
| `dpi`              | Integer: 150         | `dpi`                  | Number:150                       |                                                                      |
| `elements`         | Array: []            | `elements`             | EditorElement[]:required         | Required without default value                                       |
| `elementAction`    | String: "addElement" | \-                     | \-                               | Removed                                                              |
| `elementFunctions` | Array: [...]         | \-                     | \-                               | Replaced by `alignButtons`, `positionButtons` and `detailProperties` |
| `events`           | editorFunctions      | \-                     | \-                               | Removed, implemented as jEditor functions                            |
| `extraFunctions`   | Array: []            | `customToolbarActions` | CustomToolbarActions[]:undefined |                                                                      |
| `helper`           | Boolean: true        | `detailProperties`     | UIElement[]:DEFAULT_PROPERTIES   | `width`, `height`, `top` and `left`, can be disabled by setting `[]` |
| `locale`           | Array: [...]         | `locale`               | Locale:ENGLISH_LOCALE            |                                                                      |
| `paperSize`        | String: "a4"         | `paperSize`            | String:'letter'                  | Sets first paperSize if none set                                     |
| `paperSizes`       | Array: [...]         | `paperSizes`           | PaperSize[]:DEFAULT_PAPER_SIZES  | `letter`, `half-letter`, `legal`, `tabloid`, `A3`, `A4` and `A5`     |
| `rendered`         | Boolean: false       | `editorMode`           | Boolean:true                     |                                                                      |
| `saveButton`       | Boolean: false       | \-                     | \-                               | Removed, functionality can be recovered using `onChange`             |
| `settings`         | Array: [...]         | `toolbarActions`       | ToolbarAction[]:DEFAULT_ACTIONS  |                                                                      |
| `sizeDecimals`     | Integer: 1           | `decimals`             | Number:2                         |                                                                      |
| `sizeUnit`         | String: "cm"         | `units`                | String:required                  | Required without default value                                       |
| `title`            | String: "jEditor"    | `title`                | String:"jEditor"                 |                                                                      |
| `zoom`             | Double: 1            | `zoom`                 | Number:100                       | Change value multiplied by `100`                                     |
| `zoomIncrement`    | Double: 0.1          | `zoomIncrement`        | Number:10                        | Change value multiplied by `100`                                     |

### Functions

Most of the functions have remained the same, the changes are:

| Function v2.x         | Function v3.x                                             | Notes                                                                                        |
| --------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `setOptions(options)` | `setOptions(options: EditorOptions[])`                    | Now it replaces the whole options value, for same behavior as v2 use `mergeOptions(options)` |
| `setData(options)`    | `setData(data: EditorData[])`                             |                                                                                              |
| `renderObjects()`     | `renderElements()`                                        | For whole editor use `render()`                                                              |
| `setPaper(paperSize)` | `setPaperSize(papserName?: string, orientation?: string)` | If no paper name is sent, it will set the first paper size in `paperSizes` property          |
| `setBackround(url)`   | `setBackround(url?: string)`                              |                                                                                              |
| `clearBackround() `   | \-                                                        | Removed, for same behavior as v2 use `setBackground()`                                       |
| `unsaved()`           | \-                                                        | Removed, can be implemented using \`onChange\`                                               |
| `getObject(element)`  | \-                                                        |                                                                                              |

### Events

All events have been converted to jEditor functions, you can use them as:

| Event v2.x                   | Replacement v3.x                                                   | Notes                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `addElement(event)`          | `getSidebar().showElementListItem(key: string)`                    |                                                                                                                                 |
| `removeElement(event)`       | `getSidebar().hideElementListItem(key: string)`                    |                                                                                                                                 |
| `modifyElement(event)`       | `getSidebar().showDetails(key: string)`                            | Alternative: `getSidebar().clickElementListItem(key: string)`                                                                   |
| `cancelModifyElement(event)` | \-                                                                 | Removed, for same behavior as v2 use `getSidebar().showDetails("")`                                                             |
| `zoomIn()`                   | `getEditor().zoomIn()`                                             |                                                                                                                                 |
| `zoomOut()`                  | `getEditor().zoomOut()`                                            |                                                                                                                                 |
| `zoomReset()`                | `getEditor().resetZoom()`                                          |                                                                                                                                 |
| `changePaper()`              | \-                                                                 | Use `getNextPageSize(options: EditorOptions[])` from `utils` and then `setPaperSize(papserName?: string, orientation?: string)` |
| `setPaper(event, paperSize)` | `setPaperSize(papserName?: string, orientation?: string)`          |                                                                                                                                 |
| `renderObjects()`            | `renderElements()`                                                 |                                                                                                                                 |
| `toast(text, css, timer)`    | `showToast(message: string, className?: string, timeout?: number)` |                                                                                                                                 |
| `unsaved()`                  | \-                                                                 | Removed                                                                                                                         |
| `saveData()`                 | \-                                                                 | Removed                                                                                                                         |
| `setPageBackround(url)`      | `setBackground(url?: string)`                                      |
