import { _EDITOR_OPTIONS } from "./options";

class Editor {

    constructor(options) {
        this._ACTUAL_OPTIONS = {..._EDITOR_OPTIONS, ...options};           
    }

    render() {
        this.renderElements();        
        this.renderSettings();
        this.renderExtraSettings();
        this.renderObjects();
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

    setPaper(paperSize = this._ACTUAL_OPTIONS.paperSize){                
        this._ACTUAL_OPTIONS.events.setPaper(undefined, paperSize);
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
    setOptions = (options) =>  this._ACTUAL_OPTIONS = {...this._ACTUAL_OPTIONS, ...options};
    getData = () => this._ACTUAL_OPTIONS.data;
    setData = (data) => this._ACTUAL_OPTIONS.data = data;
}

export default Editor;