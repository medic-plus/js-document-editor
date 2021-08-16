# jEditor

jEditor (js-document-editor) is a package that can help you show a simple interface and work as a document creation tool, where the user can move and resize the elements how they want inside a page (similar to Word).

## Installing jEditor

You can download it directly or cloning the repository and copying the dist folder to your project.

### NPM

This package is hosted as a npm package and can be installed directly from official repository using:

```
npm i js-document-editor
```

## Usage

You need to import the css and js files (and fontawesome css in case you want it), then create a div with class jEditor

```html
<html>
  <head>
    <link href="css/jeditor.css" rel="stylesheet" />
    <link href="fa/css/all.min.css" rel="stylesheet" />
    <!--If you wish to use fontawesome-->
  </head>
  <body>
    <div class="jEditor"></div>
    <script src="js/jeditor.js"></script>
    <script>
      const jEditor = $.jEditor(options);
    </script>
  </body>
</html>
```

### Global Options

| option           |       default        | description                                                                  |
| ---------------- | :------------------: | ---------------------------------------------------------------------------- |
| background       |     String: null     | URL or BASE64 of a background image                                          |
| container        |  String: ".jEditor"  | querySelector for editor container                                           |
| data             |      Array: []       | set elements on start                                                        |
| dpi              |     Integer: 150     | dpi used as base for the paperSizes                                          |
| elements         |      Array: []       | elements available to be added to the document                               |
| elementAction    | String: "addElement" | default action on element click                                              |
| elementFunctions |     Array: [...]     | buttons set per shown element                                                |
| events           |   editorFunctions    | editor actions (check src/js/functions.js)                                   |
| extraFunctions   |      Array: []       | extra functions shown on top of settings                                     |
| helper           |    Boolean: true     | display or not helper (when moving or resizing objects)                      |
| locale           |     Array: [...]     | localizable texts shown in editor                                            |
| paperSize        |     String: "a4"     | paper selected                                                               |
| paperSizes       |     Array: [...]     | list of paper sizes (name, width and height in pixels)                       |
| rendered         |    Boolean: false    | sets objects as rendered (not draggable or resizable)                        |
| saveButton       |    Boolean: false    | triggers for save button, needs an element with `.btn[data-action=saveData]` |
| settings         |     Array: [...]     | actions shown in settings panel                                              |
| sizeDecimals     |      Integer: 1      | amount of decimals shown in helper                                           |
| sizeUnit         |     String: "cm"     | default size for helper (mm, cm, inch, px)                                   |
| title            |  String: "jEditor"   | title shown in side panel                                                    |
| zoom             |      Double: 1       | default zoom at render                                                       |
| zoomIncrement    |     Double: 0.1      | amount of zoom increased or decreased                                        |

#### Locale

You can customize your locale to your needs, the defaults are:

```
locale: {
  width: 'Width',
  height: 'Height',
  topMargin: 'Top margin',
  leftMargin: 'Left margin',
  return: 'Return',
  paperChange: 'The paper has been set to :size',
  saved: 'Changes saved',
  hPosition: 'Horizontal position',
  vPosition: 'Vertical position',
  textAlign: 'Text align',
  fontSize: 'Font size',
  placeholder: 'Placeholder'
},
```

#### Extra Functions

Extra functions are shown on top of settings and can do a series of actions, for example:

```js
function defaultValues() {
  _jeditor.setData(defaultData);
  _jeditor.renderObjects();
}
function saveData() {
  _jeditor.getOptions().events.saveData();
  var data = _jeditor.getData();
  alert(`Saved data: ${data.length} elements`);
}
```

You need to set your functions before `$.jEditor()`

```
[
  {action: 'defaultValues', content: '<span class="fa fa-magic"></span> Default View', class: 'btn', show: true},
  {action: 'saveData', content: '<span class="fa fa-save"></span> Save', class: 'btn', show: true},
]
```

#### Paper Sizes

Paper sizes are defined by pixels (based on your dpi) default values are:

```
paperSizes: {
  letter: {name: 'Letter', width: 1276, height: 1648},
  a4: {name: 'A4', width: 1240, height: 1754},
  a5: {name: 'A5', width: 1240, height: 874}
},
```

#### Settings

Settings are shown at the bottom of the panel, basic functions are:

- _toggleRender_: set objects as rendered (not draggable or resizable)
- _changePaper_: changes the page size to the next paperSize in the array (goes to first if last is active)
- _zoomOut_: decreases the zoom by the amount set on zoomIncrement
- _zoomIn_: increases the zoom by the amount set on zoomIncrement
- _zoomReset_: sets the zoom to fit the page fully visible (horizontally)

```
settings: [
  {action: 'toggleRender', content: '<span class="fa fa-edit"></span>', class: 'btn', show: true},
  {action: 'changePaper', content: '<span class="fa fa-file"></span>', class: 'btn', show: true},
  {action: 'zoomOut', content: '<span class="fa fa-minus"></span>', class: 'btn', show: true},
  {action: 'zoomIn', content: '<span class="fa fa-plus"></span>', class: 'btn', show: true},
  {action: 'zoomReset', content: '<span class="fa fa-expand-arrows-alt"></span>', class: 'btn', show: true},
],
```

## Functions

After executing `var jEditor = $.jEditor()` you can use that variable or the global variable `_jeditor` to access some of it functions:

- _getOptions()_: return the options set at runtime.
- _setOptions(options)_: return a merge of the options.
- _getData()_: return the data (values) set at runtime.
- _setData(options)_: sets objects data (need to run renderObjects() to show it on editor).
- _renderObjects()_: Executes the event renderObjects (creates elements based on data).
- _setPaper(paperSize)_: Executes the event setPaper (sets page size).

### Events

You can run the editor functions anytime you need it, to access any function just use `_jeditor.getOptions().events.xxxx()` the events available are:

All functions takes the first parameter as a click event where it gets the targeted DOM element with the attribute [data-element=n]

- _addElement(event)_: gets targeted element and adds the object to the page.
- _removeElement(event)_: gets targeted element and removes the object from the page.
- _modifyElement(event)_: gets targeted element and shows settings panel for the element.
- _cancelModifyElement(event)_: hides the settings panel to show the element list.
- _zoomIn()_: increases the zoom by the amount set on zoomIncrement.
- _zoomOut()_: decreases the zoom by the amount set on zoomIncrement.
- _zoomReset()_: sets the zoom to fit the page fully visible (horizontally).
- _changePaper()_: changes the page size to the next paperSize in the array (goes to first if last is active).
- _setPaper(event, paperSize)_: sets the page size to the paperSize value (has to exists in paperSizes).
- _renderObjects()_: renders the objects based on the data.
- _toast(text, css, timer)_: shows a toast with the css as class (example "bg-success") for the timer amount (ms).
- _unsaved()_: sets a `beforeunload` as en event listener.
- _saveData()_: removes `beforeunload` event listener and shows a toast.
- _setBackround(url)_: sets the background-image property of the page and as the background option.
- _clearBackround()_: clears the page background and sets the option as null.

# Elements

Elements are shown in the side panel and when clicked are added to the page as an object, can be defined with this options:

| option               |      default      | description                                          |
| -------------------- | :---------------: | ---------------------------------------------------- |
| align                | String: "initial" | CSS value for text-align                             |
| fontSize             |    Integer: 16    | font size in pixels                                  |
| height               |    Integer: 20    | height of the displayed object in pixels             |
| left                 |    Integer: 0     | left position in pixels from start of page           |
| placeholder          |    String: ""     | text shown inside the element before the value       |
| settings             |   Object: {...}   | defines if an input is shown when editing an element |
| settings.align       |   Boolean: true   | shows or hides align select in side panel            |
| settings.fontSize    |   Boolean: true   | shows or hides font size input in side panel         |
| settings.placeholder |   Boolean: true   | shows or hides placeholder input in side panel       |
| top                  |    Integer: 0     | top position in pixels from start of page            |
| value                |    String: ""     | value displayed on the object (could be HTML)        |
| width                |   Integer: 100    | width of the displayed object in pixels              |

# Data

Data can be return with `_jeditor.getData()` or set with `_jeditor.setData(...)` (and run renderObjects() to show them), this values can have this options:

| option      |      default      | description                                    |
| ----------- | :---------------: | ---------------------------------------------- |
| element     |   Integer: null   | index of item in element array                 |
| fontSize    |    Integer: 16    | font size in pixels                            |
| width       |   Integer: 100    | width of the displayed object in pixels        |
| height      |    Integer: 20    | height of the displayed object in pixels       |
| top         |    Integer: 0     | top position in pixels from start of page      |
| left        |    Integer: 0     | left position in pixels from start of page     |
| align       | String: "initial" | CSS value for text-align                       |
| placeholder |    String: ""     | text shown inside the element before the value |
| value       |    String: ""     | value displayed on the object                  |

## License

jEditor is release under the MIT license. You are free to use, modify and distribute this software.
