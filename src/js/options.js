import * as editorFunctions from "./functions";
export let _EDITOR_OPTIONS = {    
    background: null,
    container: '.jEditor',
    data: [],
    dpi: 150,
    elements: [],
    elementAction: 'addElement',
    elementFunctions: [                          
        {action: 'modifyElement', content: '<span class="fa fa-edit"></span>', class: 'btn info', show: false},
        {action: 'removeElement', content: '<span class="fa fa-times"></span>', class: 'btn danger', show: false},
    ],
    events: editorFunctions,
    extraFunctions: [],
    helper: true,
    locale: {
        width: 'Width',
        height: 'Height',
        top: 'Top margin',
        left: 'Left margin',
        return: 'Return',
        paperChange: 'The paper has been set to :size',
        saved: 'Changes saved'
    },
    paperSize: 'a4',
    paperSizes: {
        letter: {name: 'Letter', width: 1276, height: 1648},
        a4: {name: 'A4', width: 1240, height: 1754}, 
        a5: {name: 'A5', width: 1240, height: 874}
    },
    rendered: false,   
    saveButton: false, 
    settings: [
        {action: 'toggleRender', content: '<span class="fa fa-edit"></span>', class: 'btn', show: true},
        {action: 'changePaper', content: '<span class="fa fa-file"></span>', class: 'btn', show: true},
        {action: 'zoomOut', content: '<span class="fa fa-minus"></span>', class: 'btn', show: true},
        {action: 'zoomIn', content: '<span class="fa fa-plus"></span>', class: 'btn', show: true},
        {action: 'zoomReset', content: '<span class="fa fa-expand-arrows-alt"></span>', class: 'btn', show: true},
    ],
    sizeDecimals: 1,
    sizeUnit: 'cm',
    title: 'jEditor',
    zoom: 1,  
    zoomIncrement: 0.1,  
}
export let _ELEMENT_OPTIONS = {
    align: "initial", 
    fontSize: 20,     
    height: 20, 
    left: 0,   
    placeholder: "",
    settings: {
        align: true,
        fontSize: true,
        placeholder: true,
    },
    top: 0, 
    value: "", 
    width: 100,    
}

export let _DATA_OPTIONS = {
    element: null,
    fontSize: 20,
    width: 100, 
    height: 20, 
    top: 0,
    left: 0,
    align: "initial",
    placeholder: "",        
    value: "", 
}