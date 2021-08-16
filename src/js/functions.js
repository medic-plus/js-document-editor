import { _DATA_OPTIONS, _ELEMENT_OPTIONS } from "./options";
import { initDragElement, initResizeElement } from "./utils";

const merge = require('deepmerge');

var getOptions = () => _jeditor.getOptions();
var setOptions = (options) => _jeditor.setOptions(options);
var getData = () => _jeditor.getData();
var setData = (data) => _jeditor.setData(data);

function setZoom(zoom) {
    const page = document.querySelector(".page");
    setOptions({zoom});
    page.style.zoom = zoom;
}
function toggleElementButtons(element, index){            
    document.querySelectorAll(`[data-element="${index}"].btn`).forEach((button) => {  
        button.classList.toggle("d-none");
    });        
    element.classList.toggle("active");
}
function renderObject(object){
    const page = document.querySelector(".page");
    const element = merge(_ELEMENT_OPTIONS, getOptions()?.elements[object.element]);    
    const settings = element.settings;     
    page.innerHTML += `<div class="object" data-element="${object.element}">${settings.placeholder ? element.placeholder : ''} ${element.value ?? ""}</div>`;    
    const DOMobject = document.querySelector(`[data-element="${object.element}"].object`);    
    DOMobject.style.width = object.width + "px";
    DOMobject.style.height = object.height + "px";
    DOMobject.style.top = object.top + "px";
    DOMobject.style.left = object.left + "px";      
    DOMobject.style.textAlign = object.align ?? 'initial';    
    const liElement = document.querySelector(`li[data-element="${object.element}"]`);
    if(getOptions().rendered){
        DOMobject.classList.add("rendered");
    }
    if(!liElement.classList.contains("active")){        
        toggleElementButtons(liElement, object.element)
    }
}
function objectTriggers(object){
    let data = getData();
    let index = parseInt(object.getAttribute("data-element"));
    let arrayIndex = findWithAttr(data, "element", index);
    data[arrayIndex].width = object.offsetWidth;
    data[arrayIndex].height = object.offsetHeight;
    data[arrayIndex].top = object.offsetTop;
    data[arrayIndex].left = object.offsetLeft;      
    setData(data);
    unsaved();
}
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
export function getElementData(index, element) {
    const settings = element.settings; 
    return {
        element: index,
        fontSize: settings.fontSize ? element.fontSize : 20,
        width: element.width ?? 100, 
        height: element.height ?? 20, 
        top: element.top ?? 0,
        left: element.left ?? 0,
        align: settings.align ? element.align : "initial",
        placeholder: settings.placeholder ? element.placeholder : "",        
        value: element.value ?? "", 
    }
}
export function addElement(event) {
    event.stopPropagation();
    const elementDOM = event.target.closest("li");        
    const index = parseInt(elementDOM.getAttribute("data-element"));        
    const element = merge(_ELEMENT_OPTIONS, getOptions()?.elements[index]);    
    if(elementDOM.classList.contains("active")) return false;
    toggleElementButtons(elementDOM, index);
    let newData = getData();       
    newData.push(getElementData(index, element));
    let data = setData(newData);   
    renderObjects();
    return data;
}
export function removeElement(event) {    
    event.stopPropagation();
    const element = event.target.closest("li");
    const index = parseInt(element.getAttribute("data-element"));  
    const object = document.querySelector(`.object[data-element="${index}"]`);
    if(!element.classList.contains("active")) return false;    
    toggleElementButtons(element, index);    
    let data = getData().filter(item => item.element !== index);        
    object.remove();
    return setData(data);
}
export function modifyElement(event) {
    let index = event.target.getAttribute("data-element");    
    let divContent = document.querySelector(".detail .content");
    let divActions = document.querySelector(".detail .actions");
    const options = getOptions();
    const element = options.elements[index];
    document.querySelector(".detail").classList.remove("d-none");
    document.querySelector(".elements-wrapper").classList.add("d-none");
    document.querySelector(".detail .header").innerHTML = element.text;
    divContent.innerHTML = ``;
    divActions.innerHTML = `<button class="btn warning">${options.locale.return}</button>`;
    document.querySelector('.detail .actions button.warning').addEventListener("click", options.events.cancelModifyElement);
}
export function cancelModifyElement(event) {
    let content = document.querySelector(".detail .content");
    document.querySelector(".detail").classList.add("d-none");
    document.querySelector(".elements-wrapper").classList.remove("d-none");
    content.innerHTML = ``;
}
export function zoomIn() {
    let zoom = getOptions().zoom + getOptions().zoomIncrement;
    setZoom(zoom);
}
export function zoomOut() {
    let zoom = getOptions().zoom - getOptions().zoomIncrement;
    setZoom(zoom);
}
export function zoomReset() {
    const documentWidth = document.querySelector(".document").offsetWidth;
    const pageWidth = document.querySelector(".page").offsetWidth;
    var zoom = (Math.round((documentWidth / pageWidth) * 10) / 10) - 0.13;
    setZoom(zoom);
}
export function changePaper(event) {    
    const sizes = Object.keys(getOptions().paperSizes);    
    let index = sizes.indexOf(getOptions().paperSize) + 1;        
    let paper = sizes[index === sizes.length ? 0 : index];
    setPaper(event, paper);
}
export function setPaper(event, paperSize = "a4") {   
    const size = getOptions().paperSizes[paperSize];     
    const page = document.querySelector(".page");
    if(size){
        page.style.width = `${size.width}px`;
        page.style.height = `${size.height}px`;        
        setOptions({paperSize});
        zoomReset();
        toast(getOptions().locale.paperChange.replace(":size", size.name), "bg-success");
    }
    return false;
}
export function renderObjects() {    
    document.querySelector(".page").innerHTML = '';    
    getData().forEach((data) => {        
        renderObject(merge(_DATA_OPTIONS, data));
    });
    const helper = getOptions().helper;
    const selector = document.querySelectorAll(".object:not(.rendered)");
    initDragElement(selector, objectTriggers, helper);
    initResizeElement(selector, objectTriggers, helper);
}
export function toggleRender() {
    setOptions({rendered: !getOptions().rendered});
    renderObjects();
}
export function toast(text, css, timer = 3000) {
    let wrapper = document.querySelector(".toasts-wrapper");
    let div = document.createElement("div");
    div.className = `toast ${css}`;
    div.innerHTML = text;
    wrapper.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, timer);
}
export function unsaved() {
    window.addEventListener("beforeunload", exitConfirmation);    
    if(getOptions().saveButton){
        document.querySelector(".btn[data-action=saveData]").className = "btn primary";
    }
}
export function exitConfirmation(e) {            
    (e || window.event).returnValue = "Changes you made may not be saved."; //Gecko + IE
    return "Changes you made may not be saved.";
}
export function saveData() {
    window.removeEventListener("beforeunload", exitConfirmation);
    toast(getOptions().locale.saved, "bg-success");
    if(getOptions().saveButton){
        document.querySelector(".btn[data-action=saveData]").className = "btn";
    }
}
export function setPageBackground(url = null) {        
    document.querySelector(".page").style.backgroundImage = (url !== "" && url !== null) ? `url(${url})` : '';
}