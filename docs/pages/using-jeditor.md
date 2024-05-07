---
title: Using JEditor
---

## Basic Usage

After you initialized jEditor with the [default options](./configuration.md) you can start calling your editor to get or set values and configurations.

- [Creating the elements](#setting-elements)
- [Working with elements values](#getting-and-setting-elements-values)
- [Define a custom toolbar](#custom-toolbar)
- [Change the page background](#changing-the-background)
- [How to use the listeners?](#listeners)

### Setting elements

Elements are the main component on the editor, without them your editor will look empty and you won't be able to do a lot (other than changing the paper size, rotation and zoom).

You can define your first element with the following properties:

```typescript
const myElements = [
    {
        // Element identifier, must be unique to avoid conflicts,
        // is recommended to not have any spaces on the key
        key: "my-element-key",
        // Here you can define the name that will be showing on the editor sidebar
        text: "My Element",
        // On value property you can define either plain text or HTML content
        // that will be displayed when the element is added to the editor page.
        value: `<div><h1>My Element</h1></div>`,
        // Then you will need to define the width and height of the element in pixels
        width: 100,
        height: 30,
        // The remaining properties are optional
        align: "center",
        fontSize: 20,
        placeholder: "Element: ",
        // On the setting property you can disable any of the sidebar functions,
        // all of them are enabled by default
        settings: {
            align: false,
            fontSize: true,
            placeholder: true,
        }
    }
];

// Now you can pass your elements array to the editor `elements` property
const myEditor = new jEditor({..., elements: myElements}, data);
```

### Getting and setting elements values

After you defined your elements and you are able to use the editor, you may want to get or set the element values or process them in some way, you can use the editor `data functions`

> **_IMPORTANT:_** All data changes won't be reflected on the editor until you execute `myEditor.render()` or `myEditor.renderElements()`.

#### Initialize editor with data

```typescript
const initialData = [
    {
        // The editor will go and look up for the element settings based on the element key
        element: "my-element-key",
        left: 200,
        top: 100,
        width: 100,
        height: 30,
        // The remaining properties are optional
        align: "right",
        fontSize: 20,
        placeholder: "Element: ",
        value: `<div><h1>My Element</h1></div>`,
    }
];

const myEditor = new jEditor({...}, initialData);
```

#### Getting data

```typescript
// This will return an array with the element positions similar to the `initialData` array
const myData = myEditor.getData();

// If you want to get an element data and REMOVE it from the editor
// you can use `pullData` by passing the element key
const myRemovedData = myEditor.pullData("my-element-key");

// To be sure the element data exists you can use the `hasData` as validation
if (myEditor.hasData("my-element-key")) {
  const myElementData = myEditor.getData();
}
```

#### Setting data

> **_IMPORTANT:_** It is NOT recommended to change the data directly as it can cause conflicts with the editor, for example `myData[0].top = 500;`

You can change a single or multiple elements values by using any of the following functions:

```typescript
// Instead you can change ALL the elements values for new ones you can use:
const myNewData = [...];
myEditor.setData(myNewData);

// If you want to add new data for a SINGLE element to your existing values you can use:
const myNewData = {element: "my-element-key", ...};
myEditor.pushData(myNewData)

// Or if you want to change only some values of a SINGLE element
// This will override the old values and return the new element values
const myNewData = {top: 200, left: 500};
myEditor.mergeData("my-element-key", myNewData);
```

### Custom toolbar

If you want to add more functionality to your editor, you can add custom buttons that will let you interact directly with the editor options and properties.

By default, no custom actions are set, so the second toolbar is not visible.

```typescript
const myData = [...];
const myCustomActions = [
  {
    // The content will fill the button text, it can be set as HTML code
    content: "Reset Elements",
    // You can set a custom CSS class to change the looks of the button
    className: "text-sm",
    // On the action property, you can define your own functionality
    // having the editor as a function parameter
    action: (editor) => {
      editor.setData([...myData]);
      editor.render();
    },
  },
];

// "Reset Elements" button needs the `data` variable to get cloned (spread operator)
// so the original array is not modified
const myEditor = new jEditor({..., customActions: myCustomActions}, [...myData]);
```

### Changing the background

The page background is white by default, you can set an image by using:

```typescript
// You can define a URL to set the page CSS property `background: url(...)`
const myCustomBackground = "https://placehold.co/600x400";
// Or define a `Background` object with custom CSS properties
const myFullCustomBackground = {
    // You can also use base64 images
    url: "data:image/png;base64,...",
    // The remaining properties are optional
    size: "cover", // background-size
    repeat: "no-repeat", // background-repeat
    position: "center", // background-position
}

const myEditor = new jEditor({..., background: myCustomBackground}, data);
```

Check the [examples section](./examples.md) for the live demo to see an input image load directly to the background

### Listeners

jEditor comes with 3 listeners that can help you detect any changes with the elements, options and properties

#### Events

Events are the defined actions that will be returned on the listeners as strings and can be one of:

| Event               | Component | Element | Description                                                         |
| ------------------- | --------- | ------- | ------------------------------------------------------------------- |
| setPaperSize        | editor    | No      | When the paper size has been changed (function call or toolbar)     |
| setZoom             | editor    | No      | When the zoom has been changed (function call or toolbar)           |
| elementTrigger      | editor    | Yes     | When an element has been dragged and/or resized                     |
| setPageBackground   | editor    | No      | The page background has been set and rendered (not just the option) |
| showElementListItem | sidebar   | Yes     | The element was added to the editor                                 |
| hideElementListItem | sidebar   | Yes     | The element `X` button is pressed                                   |
| toggleEditor        | sidebar   | No      | Toolbar: Toggle editor mode                                         |
| ZoomIn              | sidebar   | No      | Toolbar: Zoom In                                                    |
| zoomOut             | sidebar   | No      | Toolbar: Zoom Out                                                   |
| zoomReset           | sidebar   | No      | Toolbar: Reset Zoom                                                 |
| paperSize           | sidebar   | No      | Toolbar: Change paper Size                                          |
| rotate              | sidebar   | No      | Toolbar: Rotate page                                                |
| align               | sidebar   | Yes     | Click on any align button                                           |
| fontSize            | sidebar   | Yes     | Change the font size value using the input                          |
| placeholder         | sidebar   | Yes     | Change the placeholder value using the input                        |
| position            | sidebar   | Yes     | Click on any of the position buttons (cardinal or center)           |

#### Global listener (`onChange`)

This is the default event that is global to the editor, it gets triggered every time `onSidebarChange` or `onEditorChange` are called.

```typescript
const myOptions = {
    ...,
    onChange: (editor: jEditor, component: string, event: string) => {
        // Component can be either "sidebar" or "editor"
        if(component === "sidebar" || component === "editor") {
            const myData = editor.getData();
            if(event === 'elementTrigger') {
                console.log("An element has been modified");
            }
            ...
        }
    }
}
const myEditor = new jEditor(myOptions, data);
```

#### Components listeners (`onSidebarChange` & `onEditorChange`)

The components listeners can help you to execute a custom function after an `editor` or `sidebar` action has been completed

> **_IMPORTANT:_** The `data` parameter can be `undefined` if a non-element event is triggered (zoom or page changes), make sure to validate accordingly

```typescript
const myOptions = {
    ...,
    onSidebarChange: (editor: jEditor, event: string, data: EditorData | string | undefined) => {
        if(event.includes('ElementListItem')) {
            const element = (typeof data === 'string' ? data : data.element);
            console.log('Element %s was added or removed from the editor', element);
        }
    },
    onEditorChange: (editor: jEditor, event: string, data: EditorData | string | undefined) => {
        if(event.toLowerCase().includes('zoom')) {
            console.log('Zoom event detected on the editor');
        }
    }
}
const myEditor = new jEditor(myOptions, data);
```

#### Elements listeners (`onElementsChange`)

If you need to process only elements events (position, size, font size, and properties), you can use the custom element listener which won't return a `undefined` value for the `data` parameter

> **_IMPORTANT:_** The `data` parameter can be a `string` value for the element key if for some reason the values are not defined on the editor data

```typescript
const myOptions = {
    ...,
    onElementsChange: (editor: jEditor, event: string, data: EditorData | string) => {
        if(typeof data === 'string'){
            console.log('Element %s was modified by event %s', data, event);
        } else {
            console.log('Elements %s, Event %s', data, event);
            console.log(data);
        }
    }
}
const myEditor = new jEditor(myOptions, data);
```

## Advanced Usage

You can call the editor functions directly and make your own custom behavior, see [Advanced Usage](./advanced-usage.md)
