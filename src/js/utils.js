import interact from 'interactjs';

export function initResizableElement(selector, triggerEvent = () => {}, helper) {    
    let helperDiv = document.querySelector(".helper");    
    document.querySelectorAll(selector).forEach((object) => {
        var positions = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];       
        positions.forEach(function(position) {
            var handle = document.createElement("div");
            var edge = position.length > 1 ? position.split("").join("-edge ") : position;
            handle.className = `handles ${position}-cursor ${edge}-edge`;
            object.appendChild(handle);
        });
    });  
    interact(selector).resizable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent'
            }),
            interact.modifiers.restrictSize({
                min: { width: 10, height: 10 }
            })
        ],
        edges: { top: ".n-edge", left: ".w-edge", bottom: ".s-edge", right: ".e-edge"},
        listeners: {
            move: function (event) {
                event.stopPropagation();
                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    top: `${event.target.offsetTop + event.deltaRect.top}px`,
                    left: `${event.target.offsetLeft + event.deltaRect.left}px`
                });
                if(helper) setHelper(event.target);
            }
        }
    }).on("resizeend", function(event) {
        triggerEvent(event.target);        
        helperDiv.innerHTML = ''
    });
}
export function initDraggableElement(selector, triggerEvent = () => {}, helper) {    
    let helperDiv = document.querySelector(".helper");    
    interact(selector).draggable({
        modifiers: [
            interact.modifiers.snap({
              targets: [
                interact.snappers.grid({ x: 1, y: 1 })
              ],
            }),
            interact.modifiers.restrictRect({
                restriction: 'parent'
            }),
        ],
        listeners: {
            move (event) {
                event.target.style.top = `${event.target.offsetTop + event.dy}px`,
                event.target.style.left = `${event.target.offsetLeft + event.dx}px`    
                if(helper) setHelper(event.target);            
            },
        }
    }).on('dragend', (event) => {
        triggerEvent(event.target);        
        helperDiv.innerHTML = ''
    });
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
