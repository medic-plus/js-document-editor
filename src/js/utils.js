export function initDragElement(objects, triggerEvent = () => {}, helper) {    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;    
    var element = null;
    var currentZIndex = 100;      
    let helperDiv = document.querySelector(".helper");
    objects.forEach((object) => {
        object.onmousedown = dragMouseDown;
    });    
    function dragMouseDown(e) {
        if(e.target.classList.contains("resizer")) return false;
        element = this;
        element.style.zIndex = "" + ++currentZIndex;    
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }  
    function elementDrag(e) {
        if (!element) {
            return;
        }  
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        const maxTop = element.parentNode.offsetHeight - element.offsetHeight;
        const maxLeft = element.parentNode.offsetWidth - element.offsetWidth + 1;        
        let top = element.offsetTop - pos2;
        top = top < 0 ? 0 : (top > maxTop ? maxTop : top);                
        element.style.top = top + "px";
        let left = element.offsetLeft - pos1;
        left = left < 0 ? 0 : (left > maxLeft ? maxLeft : left);
        element.style.left = left + "px";
        triggerEvent(element);
        if(helper) setHelper(element);
    }  
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        if(helper) helperDiv.innerHTML = '';
    }  
}
  
export function initResizeElement(objects, triggerEvent = () => {}, helper) {    
    var element = null;
    var startX, startY, startWidth, startHeight;  
    let helperDiv = document.querySelector(".helper");
    objects.forEach((object) => {
        //right-resizer
        var right = document.createElement("div");
        right.className = "resizer resizer-right";
        object.appendChild(right);
        right.addEventListener("mousedown", initDrag, false);
        right.parentObject = object;
        //bottom-resizer
        var bottom = document.createElement("div");
        bottom.className = "resizer resizer-bottom";
        object.appendChild(bottom);
        bottom.addEventListener("mousedown", initDrag, false);
        bottom.parentObject = object;
        //both-resizer
        var both = document.createElement("div");
        both.className = "resizer resizer-both";
        object.appendChild(both);
        both.addEventListener("mousedown", initDrag, false);
        both.parentObject = object;
    });  
    function initDrag(e) {
        element = this.parentObject;  
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
        document.documentElement.addEventListener("mousemove", doDrag, false);
        document.documentElement.addEventListener("mouseup", stopDrag, false);        
    }  
    function doDrag(e) {
        let width = startWidth + e.clientX - startX;
        element.style.width = (width < 10 ? 10 : width) + "px";
        let height = startHeight + e.clientY - startY;
        element.style.height = (height < 10 ? 10 : height) + "px";
        triggerEvent(element);
        if(helper) setHelper(element);
        
    }  
    function stopDrag() {
        document.documentElement.removeEventListener("mousemove", doDrag, false);
        document.documentElement.removeEventListener("mouseup", stopDrag, false);
        if(helper) helperDiv.innerHTML = '';
    }
}

function setHelper(element) {
    let helper = document.querySelector(".helper");
    const options = _jeditor.getOptions();
    const locale = options.locale;
    const unit = options.sizeUnit;
    const index = parseInt(element.getAttribute("data-element"));  
    let height = pixelsToUnit(unit, options.sizeDecimals, options.dpi, element.offsetHeight) + unit;
    let width = pixelsToUnit(unit, options.sizeDecimals, options.dpi, element.offsetWidth) + unit;
    let top = pixelsToUnit(unit, options.sizeDecimals, options.dpi, element.offsetTop) + unit;
    let left = pixelsToUnit(unit, options.sizeDecimals, options.dpi, element.offsetLeft) + unit;    
    let content = '<div class="content">';
    helper.innerHTML = `<div class="header">${options.elements[index].text}</div>`;
    content += `<div><strong>${locale.height}</strong>${height}</div>`;
    content += `<div><strong>${locale.width}</strong>${width}</div>`;
    content += `<div><strong>${locale.topMargin}</strong>${top}</div>`;
    content += `<div><strong>${locale.leftMargin}</strong>${left}</div>`;
    helper.innerHTML += `${content}</div>`;
}
function pixelsToUnit(unit, decimals, dpi, value) {
    const INCH_TO_MM = 25.4;    
    switch(unit){
        case "mm":
            return roundDecimals(INCH_TO_MM * value / dpi, decimals);
        case "cm":
            return roundDecimals((INCH_TO_MM * value / dpi) / 10, decimals);
        case "inch":
            return roundDecimals(value / dpi, decimals);
        default:
            return roundDecimals(value, decimals);            
    }
}
function roundDecimals(value, decimals){
    return value.toFixed(decimals);
}
