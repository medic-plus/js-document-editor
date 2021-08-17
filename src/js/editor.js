import { _DATA_OPTIONS, _EDITOR_OPTIONS } from "./options";

const merge = require('deepmerge');
let _rendered = false;

class Editor {

    constructor(options) {
        this._ACTUAL_OPTIONS = merge(_EDITOR_OPTIONS, options);
    }

    render() {    
        if(_rendered)
            return console.error("jEditor already rendered, try using _jeditor.renderObjects() to redraw");
        this.createStructure();        
        this.renderElements();        
        this.renderSettings();
        this.renderExtraSettings();
        this.renderObjects();
        this.setBackground();
        _rendered = true;
    }

    createStructure() {
        const container = document.querySelector(this._ACTUAL_OPTIONS.container);
        container.innerHTML += `<div class="panel"></div><div class="document"></div><div class="toasts-wrapper"></div>`;
        const panel = container.querySelector(".panel");
        panel.innerHTML += `<div class="title">${this._ACTUAL_OPTIONS.title}</div>`;
        panel.innerHTML += `<div class="elements-wrapper"><ul class="elements"></ul></div>`;
        panel.innerHTML += `<div class="detail d-none"><div class="header"></div><div class="content"></div><div class="actions"></div></div>`;
        panel.innerHTML += `<div class="settings"><div class="extra"></div><div class="base"></div></div>`;
        panel.innerHTML += `<div class="helper"></div>`;
        const doc = container.querySelector(".document");        
        doc.innerHTML += `<div class="page-wrapper"><div class="page"></div></div>`;
        const page = document.querySelector(".page");
        const _this = this;
        page.addEventListener("click", function(event) {
            if(event.target === page)
            _this._ACTUAL_OPTIONS.events.cancelModifyElement()
        });
    }

    renderElements() {
        const EDITOR_OPTIONS = this._ACTUAL_OPTIONS;
        let divElements = document.querySelector(".elements");
        EDITOR_OPTIONS.elements?.forEach(function (element, index) {        
            let actions = "";
            EDITOR_OPTIONS.elementFunctions?.forEach((options) => {   
                actions += `<button class="${options.class} ${!options.show ? 'd-none' : ''}" data-action="${options.action}" data-element="${index}">${options.content}</button>`;
            });         
            divElements.innerHTML += `<li class="element" id="element_${index}" data-action="${EDITOR_OPTIONS.elementAction}" data-element="${index}">            
            <div class="text">${element.text}</div>
            <div class="actions" data-id="${index}">${actions}</div>            
            </li>`;
        });
    }

    renderSettings(){
        let divSettingsBase = document.querySelector(".settings .base");
        this._ACTUAL_OPTIONS.settings?.forEach(function (options, index) {    
            divSettingsBase.innerHTML += `<button class="${options.class} ${!options.show ? 'd-none' : ''}" data-action="${options.action}" data-setting="${index}">${options.content}</button>`; 
        });
    }

    renderExtraSettings(){
        let divSettingsExtra = document.querySelector(".settings .extra");
        this._ACTUAL_OPTIONS.extraFunctions?.forEach(function (options, index) {    
            divSettingsExtra.innerHTML += `<button class="${options.class} ${!options.show ? 'd-none' : ''}" data-action="${options.action}" data-setting="${index}">${options.content}</button>`; 
        });        
    }

    renderObjects(){
        this._ACTUAL_OPTIONS.events.renderObjects();
    }

    unsaved(){
        this._ACTUAL_OPTIONS.events.unsaved();
    }

    setPaper(paperSize = this._ACTUAL_OPTIONS.paperSize){                
        this._ACTUAL_OPTIONS.events.setPaper(undefined, paperSize);
    }

    setBackground(url = this._ACTUAL_OPTIONS.background){
        this._ACTUAL_OPTIONS.background = url;
        this._ACTUAL_OPTIONS.events.setPageBackground(url);
    }

    clearBackground(){
        this._ACTUAL_OPTIONS.background = null;
        this._ACTUAL_OPTIONS.events.setPageBackground();
    }

    modifyElement(element = null, type = '', data = undefined){
        if(element === null || type === '')
            return console.log("textAlign","Element not defined");
        let editorData = this.getData();       
        const index =  editorData.map(d => d.element).indexOf(element);
        const object = this.getObject(element);
        const page = document.querySelector(".page");
        switch(type){
            case "ta": //textAlign
                editorData[index].align = data;
                break;
            case "fs": //fontSize
                editorData[index].fontSize = parseInt(data.value);
                break;
            case "ph": //placeholder
                editorData[index].placeholder = data.value;
                break;
            case "pos": //position
                let position = data.indexOf("v-") !== -1 ? 'top' : 'left';                
                if(object === null)
                    break;
                if(data === "v-top" || data === "h-left"){
                    editorData[index][position] = 0;
                    break;
                }
                let amount = position === "top" ? (page.offsetHeight - object.height) : (page.offsetWidth  - object.width);
                if(data === "v-center" || data === "h-center"){
                    editorData[index][position] = amount / 2;
                    break;
                }
                if(data === "v-bottom" || data === "h-right"){
                    editorData[index][position] = amount - 1;
                    break;
                }
                break;
        }
        this.setData(editorData);
        this.unsaved();
        this.renderObjects();
    }

    getObject(element){
        var index = this.getData().map(d => d.element).indexOf(element);
        return index === -1 ? null : this.getData()[index];
    }

    triggers(){
        const EDITOR_OPTIONS = this._ACTUAL_OPTIONS;
        document.querySelectorAll("[data-action]").forEach((element) =>  {
            const action = element.getAttribute("data-action");
            let fn = (typeof window[action] === "function") ? window[action] : EDITOR_OPTIONS.events[action];
            element.addEventListener("click", fn);  
        });  
    }

    getOptions = () => this._ACTUAL_OPTIONS;
    setOptions = (options) => this._ACTUAL_OPTIONS = merge(this._ACTUAL_OPTIONS, options);
    getData = () => this._ACTUAL_OPTIONS.data.map(element => merge(_DATA_OPTIONS, element));
    setData = (data) => this._ACTUAL_OPTIONS.data = data.map(element => merge(_DATA_OPTIONS, element));          
}

export default Editor;