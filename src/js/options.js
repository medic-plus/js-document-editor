import * as editorFunctions from "./functions";
export let _EDITOR_OPTIONS = {
    background: null,
    data: [],
    defaultData: [],
    dpi: 150,
    elements: {},
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
        paperChange: 'The paper has ben set to :size',
        saved: 'Changes saved'
    },
    paperSize: 'a4',
    paperSizes: {
        letter: {name: 'Letter', width: 1276, height: 1648},
        a4: {name: 'A4', width: 1240, height: 1754}, 
        a5: {name: 'A5', width: 1240, height: 874}
    },
    rendered: false,    
    settings: [
        {action: 'toggleRender', content: '<span class="fa fa-edit"></span>', class: 'btn', show: true},
        {action: 'changePaper', content: '<span class="fa fa-file"></span>', class: 'btn', show: true},
        {action: 'zoomOut', content: '<span class="fa fa-minus"></span>', class: 'btn', show: true},
        {action: 'zoomIn', content: '<span class="fa fa-plus"></span>', class: 'btn', show: true},
        {action: 'zoomReset', content: '<span class="fa fa-expand-arrows-alt"></span>', class: 'btn', show: true},
    ],
    sizeDecimals: 1,
    sizeUnit: 'cm',
    zoom: 1,  
    zoomIncrement: 0.1,  
}