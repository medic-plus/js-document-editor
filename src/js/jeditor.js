
import Editor from "./editor";

function jEditor(options) {
    if(window._jeditor) 
        return console.error("A variable _jeditor has already been created")    
    window._jeditor = new Editor(options);   
    _jeditor.render();
    _jeditor.triggers();        
    _jeditor.setPaper();
    return _jeditor;    
}

export default jEditor;