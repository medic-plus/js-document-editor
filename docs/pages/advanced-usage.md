---
title: Advanced Usage
---

jEditor is packaged with some of the most essential functions that can help you interact directly with the elements, data and options that were specified for the editor.

## jEditor functions

| Function                                                         | Returns                         | Description                                                                                                                                                 |
| ---------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| render()                                                         | void                            | Initializes the editor container element and triggers initial rendering based on options. Throws error if container element not found.                      |
| renderElements()                                                 | void                            | Triggers the rendering of the individual editor elements.                                                                                                   |
| triggerChange(component: string, event: string)                  | void                            | Triggers a change event for a specific component if `onChange` property is defined on the editor options.                                                   |
| getSidebar()                                                     | EditorSideBar & EditorSection   | Returns the `Sidebar` component.                                                                                                                            |
| getEditor()                                                      | EditorContainer & EditorSection | Returns the `Editor` component.                                                                                                                             |
| getToasts()                                                      | EditorToasts & EditorSection    | Returns the `Toasts` component.                                                                                                                             |
| getOptions()                                                     | EditorOptions                   | Retrieves the current editor configuration options.                                                                                                         |
| setOptions(options: EditorOptions)                               | void                            | Sets the editor configuration options.                                                                                                                      |
| mergeOptions(options: any)                                       | EditorOptions                   | Merges new options with existing editor configurations and returns the updated options.                                                                     |
| getData()                                                        | EditorData[]                    | Retrieves the editor data.                                                                                                                                  |
| setData(data: EditorData[])                                      | void                            | Sets the editor data, replacing existing data.                                                                                                              |
| hasData(key: string)                                             | boolean                         | Checks if editor data exists for a specific element key.                                                                                                    |
| pushData(data: EditorData)                                       | void                            | Adds new editor data, throws error if no `element` property found or data already exists for that element.                                                  |
| pullData(key: string)                                            | EditorData                      | Retrieves and removes editor data for a specific element key, throws error if data not found.                                                               |
| mergeData(key: string, data: any)                                | EditorData                      | Merges new data with existing editor data for a specific element key. If data doesn't exist, creates a new entry. Returns the modified data.                |
| getElementData(key: string)                                      | EditorData \| undefined         | Gets editor data for a specific element, returns `undefined` if not found.                                                                                  |
| setPaperSize(paperName?: string, orientation?: string)           | void                            | Delegates setting the paper size and orientation to the `Editor` component (see [Editor functions](#editor-functions)).                                     |
| showToast(message: string, className?: string, timeout?: number) | void                            | Delegates adding a toast notification to the `Toasts` component (see [Toasts functions](#toasts-functions)).                                                |
| setZoom(value: number)                                           | void                            | Validates and sets the zoom level, updates editor options and delegates setting zoom to the `Editor` component (see [Editor functions](#editor-functions)). |
| setLocale(locale: string \| Locale)                              | void                            | Validates and sets the editor's locale, updates options and triggers re-rendering.                                                                          |
| getDefaultLocales()                                              | Map<string, Locale>             | Retrieves the default available locales supported by the editor.                                                                                            |
| setTheme(theme: string)                                          | void                            | Updates the jEditor container's `data-theme` attribute and checks if the theme is part of the default themes (warning logged if not).                       |
| getDefaultThemes()                                               | string[]                        | Gets the list of default available themes for the editor.                                                                                                   |

### Component/Section functions

The `Sidebar`, `Editor` and `Toasts` components share the following functions (`EditorSection`)

| Function     | Returns | Description                                                  |
| ------------ | ------- | ------------------------------------------------------------ |
| getSection() | `void`  | Returns the HTML element for the component container.        |
| render()     | `void`  | Creates and renders the component container and its content. |

### Sidebar functions

The `Sidebar` component functions can be accessed by using `myEditor.getSidebar()`

| Function                          | Returns                   | Description                                                                                                   |
| --------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| renderToolbar()                   | `void`                    | Creates and renders the sidebar toolbar elements based on `toolbarActions` defined in the options.            |
| renderElementsList()              | `void`                    | Creates and renders the list of elements within the sidebar based on `elements` defined in the options.       |
| renderCustomToolbar()             | `void`                    | Creates and renders the custom toolbar elements base on `customToolbarActions` defined in the options.        |
| getToolbar()                      | `HTMLElement`             | Retrieves the main toolbar container element.                                                                 |
| getElementsList()                 | `HTMLElement`             | Retrieves the element list container element.                                                                 |
| getCustomToolbar()                | `HTMLElement`             | Retrieves the custom toolbar container element.                                                               |
| getElementsListItem(key: string)  | `HTMLElement` \|undefined | Gets the HTML element for a specific element list item based on its key, returns `undefined` if not found.    |
| clickElementListItem(key: string) | `void`                    | Triggers the click event on the specific element list item.                                                   |
| showElementListItem(key: string)  | `void`                    | Makes a specific element list item visible and adds the values to `data`.                                     |
| hideElementListItem(key: string)  | `void`                    | Hides a specific element list item and removes the values from `data`.                                        |
| toolbarAction(action: string)     | `void`                    | Process any of the default actions (`toggleEditor`, `zoomIn`, `zoomOut`, `zoomReset`, `paperSize`, `rotate`). |
| showDetails(key: string)          | `void`                    | Shows details container with the information for a specific element.                                          |
| hideDetails()                     | `void`                    | Hides any currently displayed element details.                                                                |

### Editor functions

The `Editor` component functions can be accessed by using `myEditor.getEditor()`

| Function                                                                          | Return Type              | Description                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| renderBanner()                                                                    | void                     | Creates and renders the visual components of the editor banner, including information about `paper size`, `orientation`, and `zoom level`.                                                                        |
| renderElements()                                                                  | void                     | Renders the visual representation of all elements within the editor based on their data.                                                                                                                          |
| getBanner()                                                                       | HTMLElement              | Retrieves the banner element.                                                                                                                                                                                     |
| getPageWrapper()                                                                  | HTMLElement              | Retrieves the page wrapper element.                                                                                                                                                                               |
| getPage()                                                                         | HTMLElement              | Retrieves the page element which represents the editable area.                                                                                                                                                    |
| getActiveElement()                                                                | HTMLElement \| undefined | Gets the HTML element with `active` CSS class, returns `undefined` if not found.                                                                                                                                  |
| setPaperSize(paperName?: string, orientation?: string)                            | void                     | Sets the paper size and orientation for the editor content.                                                                                                                                                       |
| setZoom(value: number)                                                            | void                     | Sets the zoom level for the editor content (uses 100 based scale).                                                                                                                                                |
| zoomIn()                                                                          | void                     | Increases the zoom level for the editor content.                                                                                                                                                                  |
| zoomOut()                                                                         | void                     | Decreases the zoom level for the editor content.                                                                                                                                                                  |
| resetZoom()                                                                       | void                     | Resets the zoom level for the editor content to fill the page wrapper size (minus `zoomThreshold` option).                                                                                                        |
| deselectActiveElement()                                                           | void                     | Removes the `active` class from the currently selected element.                                                                                                                                                   |
| initResizableElements(selector: string, editorMode: boolean)                      | void                     | Initializes resizing functionality for elements, considering the `editor mode`.                                                                                                                                   |
| initDraggableElements(selector: string, editorMode: boolean)                      | void                     | Initializes draggable functionality for elements, considering the `editor mode`.                                                                                                                                  |
| getElementDetails(element: HTMLElement \| string)                                 | ElementDetails           | Returns an object with the following properties: `width`, `height`, `top`, and `left`                                                                                                                             |
| selectElement(key: string)                                                        | void                     | Selects a specific element within the editor by setting the `active` class.                                                                                                                                       |
| setElementPosition(key: string \| null, x?: number, y?: number)                   | void                     | Sets a specific element (active element if `key` is null) position in `x` and `y` axis.                                                                                                                           |
| setElementCardinalPosition(key: string \| null, position: string, value?: string) | void                     | Sets a specific element (active element if `key` is null) position based on cardinal points: `nw`, `n`, `ne`, `w`, `e`, `sw`, `s`, `se`, and `c` (center based on value property as `horizontal` and `vertical`). |
| setPageBackground()                                                               | void                     | Sets the background (and background properties if defined) for the editor page based on the provided options.                                                                                                     |

### Toasts functions

The `Toasts` component functions can be accessed by using `myEditor.getToasts()`

| Function                                                          | Return Type | Description                                                                                                                                                                                 |
| ----------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addToast: (message: string, className?: string, timeout?: number) | void        | Displays a toast notification with the provided message, sets the CSS class to the element and displays it for the specified time (uses `toastDuration` option if no `timeout` is provided) |
