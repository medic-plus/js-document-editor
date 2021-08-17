import { _DATA_OPTIONS, _ELEMENT_OPTIONS } from "./options";
import { initDragElement, initDraggableElement, initResizableElement } from "./utils";

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
    let textValue = `${(settings.placeholder ? (object.placeholder || element.placeholder) : '')} ${object.value || element.value}`;
    page.innerHTML += `<div class="object" data-element="${object.element}">${textValue}</div>`;    
    const DOMobject = document.querySelector(`[data-element="${object.element}"].object`);    
    DOMobject.style.width = object.width + "px";
    DOMobject.style.height = object.height + "px";
    DOMobject.style.top = object.top + "px";
    DOMobject.style.left = object.left + "px";      
    DOMobject.style.textAlign = object.align ?? 'initial';    
    DOMobject.style.fontSize = (object.fontSize ?? 20) + "px";    
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
    const element = merge(_ELEMENT_OPTIONS, options?.elements[index]);    
    document.querySelector(".detail").classList.remove("d-none");
    document.querySelector(".elements-wrapper").classList.add("d-none");
    document.querySelector(".detail .header").innerHTML = element.text;
    let htmlContent = '';   
    if(element.settings.fontSize)
        htmlContent += `<h4>${options?.locale?.fontSize}</h4>
        <input type='number' value='${element.fontSize}' onchange='_jeditor.modifyElement(${index}, "fs", this)'>`;
    if(element.settings.placeholder)
        htmlContent += `<h4>${options?.locale?.placeholder}</h4>
        <input type='text' value='${element.placeholder}' onchange='_jeditor.modifyElement(${index}, "ph", this)'>`; 
    if(element.settings.align)        
        htmlContent += `<h4>${options?.locale?.textAlign}</h4>
        <div class="btn-group">
            <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "ta", "left")'><span class="fa fa-align-left"></span></button>
            <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "ta", "center")'><span class="fa fa-align-center"></span></button>
            <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "ta", "right")'><span class="fa fa-align-right"></span></button>                
            <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "ta", "justify")'><span class="fa fa-align-justify"></span></button> 
        </div>`;    
    htmlContent += `
            <h4>${options?.locale?.hPosition}</h4>
            <div class="btn-group">
                <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "pos", "h-left")'><span class="fa fa-angle-double-left"></span></button>
                <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "pos", "h-center")'><span class="fa fa-align-center"></span></button>
                <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "pos", "h-right")'><span class="fa fa-angle-double-right"></span></button>                
            </div>
            <h4>${options?.locale?.vPosition}</h4>
            <div class="btn-group">
                <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "pos", "v-top")'><span class="fa fa-sort-amount-up"></span></button>
                <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "pos", "v-center")'><span class="fa fa-align-center"></span></button>
                <button class="btn primary" onclick='_jeditor.modifyElement(${index}, "pos", "v-bottom")'><span class="fa fa-sort-amount-down"></span></button>
            </div>
            `;
    divContent.innerHTML = htmlContent;
    divActions.innerHTML = `<button class="btn warning">${options?.locale?.return}</button>`;
    document.querySelector('.detail .actions button.warning').addEventListener("click", options?.events?.cancelModifyElement);
}
export function cancelModifyElement(event) {
    let content = document.querySelector(".detail .content");
    document.querySelector(".detail").classList.add("d-none");
    document.querySelector(".elements-wrapper").classList.remove("d-none");
    document.querySelector(".object.active").classList.remove("active");
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
    const selector = ".object:not(.rendered)";
    initDraggableElement(selector, objectTriggers, helper);    
    initResizableElement(selector, objectTriggers, helper);
    document.querySelectorAll(selector).forEach(function(object){
        object.addEventListener("click", function(event){
            document.querySelectorAll(".object.active").forEach(function(active) {
                if(active !== object) active.classList.remove("active");             
            });
            object.classList.add("active");    
            modifyElement({target: object});
        })
    });    
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