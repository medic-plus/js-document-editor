var zoom = 1, rendered = false, paper, gElements;
var papers = {a4: {width: 1240, height: 1754, w: 21.0, h: 29.7}, a5: {width: 1240, height: 874, w: 21.0, h: 14.8}};

function jEditor(elements, active, pType, panel, background) {
    gElements = elements;
    elements.forEach(function (i, index) {
        $("#panel_0").append('<div class="element" id="el_' + index + '"><button class="add" value="' + index + '"><span class="mif-plus"></span></button><button class="settings" onclick="editElement(' + index + ')" id="set_' + index + '"><span class="mif-cogs"></span></button><div class="text">' + i.text + '</div></div>');
    });
    $(".element button:not(.settings)").click(function () {
        var id = $(this).attr('value');
        unsaved();
        if ($(this).hasClass("add")) {
            $(this).removeClass("add").addClass("remove");
            $(this).html("<span class='mif-cross'></span>");
            $("#set_" + id).fadeIn();
            var align = elements[id].align ? 'text-align: ' + (elements[id].aligned !== undefined ? elements[id].aligned : "left") + ';' : '';
            $(".page").append("<div class='object' value='" + id + "' id='object_" + id + "' style='" + align + " font-size: " + elements[id].size + "px; width: " + elements[id].width + "px; height: " + elements[id].height + "px'>" + (elements[id].placeholder !== undefined ? elements[id].placeholder : "") + elements[id].value + "</div>");
            $("#object_" + id).draggable({
                containment: ".page",
                cursor: "move",
                grid: [5, 5],
                start: function (evt, ui) {
                    $(".document .position").fadeIn();
                    unsaved();
                },
                drag: function (evt, ui) {
                    var x = (paper.w * ui.position.left) / paper.width;
                    var y = (paper.h * ui.position.top) / paper.height;
                    $(".document .position").html("<span>" + elements[id].text + "</span><table><tr><td><b>Posición Vertical</b></td><td>" + (Math.round(ui.position.top * 100) / 100) + " px</td><td><b>Posición Horizontal</b></td><td>" + (Math.round(ui.position.left * 100) / 100) + " px</td></tr><tr><td></td><td>" + (Math.round(y * 100) / 100) + " cm</td><td></td><td>" + (Math.round(x * 100) / 100) + " cm</td></tr></table>");
                },
                stop: function () {
                    $(".document .position").fadeOut();
                }
            });
            $(".object").hover(function () {
                $("#el_" + $(this).attr("value")).addClass("selected");
            }, function () {
                $("#el_" + $(this).attr("value")).removeClass("selected");
            });
            $(".page .object").contextmenu(function () {
                $(this).prependTo(".page");
                var text = $("#el_" + $(this).attr("value") + " .text").text();
                showSuccess(text + " fué enviado al fondo");
                return false;
            });
        } else {
            $(this).removeClass("remove").addClass("add");
            $(this).html("<span class='mif-plus'></span>");
            $(".page #object_" + id).remove();
            $("#set_" + id).fadeOut();
        }
    });
    $(".settings input").keyup(function () {
        if ($("#settings_form")[0].checkValidity()) {
            $(".settings input").removeClass("error");
            saveEdit();
        } else {
            $(".settings input").addClass("error");
        }
    });
    $(".settings select").change(function () {
        if ($("#settings_form")[0].checkValidity()) {
            $(".settings input").removeClass("error");
            saveEdit();
        } else {
            $(".settings input").addClass("error");
        }
    });
    setPaper(pType);
    setPanel(panel);
    renderValues();
    if (active !== undefined) {
        setValues(active);
    }
    if (background !== undefined) {
        setBackgroundImage(background);
    }
}

function jEditorSimple(elem, pType) {
    setPaper(pType);
    setElements(elem);
}

function setZoom(z) {
    zoom = z;
    var f = (($(".document").width() - ($(".page").width() * zoom)) / 2) / zoom;
    $(".page").css("zoom", zoom);
    $(".page").css("left", f + "px");
}
function setPaper(p) {
    paper = papers[p];
    $(".page").attr("class", "page " + p);
    $(".paper").removeClass("selected");
    $(".paper." + p).addClass("selected");
    $("#elem_w").attr("max", paper.width);
    $("#elem_h").attr("max", paper.height);
    $("#elem_w_txt").text(paper.width + "px");
    $("#elem_h_txt").text(paper.height + "px");
    var standard = (Math.round(($(".document").width() / paper.width) * 10) / 10) - 0.13;
    $(".setZoom").attr("onclick", "setZoom(" + standard + ")");
    setZoom(standard);
    unsaved();
}
function renderValues() {
    rendered = !rendered;
    $(".page .object").toggleClass("rendered");
    $("button.rendered").toggleClass("selected");
    $(".protector").toggle();
}
function editElement(id) {
    var elem = $("#object_" + id);
    $(".jEditor div.settings").fadeIn();
    $("#elem_p").val(elements[id].placeholder);
    $(".settings .title").html(elements[id].text);
    $("#elem_w").val(Math.round(elem.width()));
    $("#elem_h").val(Math.round(elem.height()));
    $("#elem_fs").show();
    $("#elem_f").val(elem.css('font-size').replace("px", ""));
    if (!gElements[id].fs) {
        $("#elem_fs").hide();
    }
    $("#elem_al").show();
    $("#elem_a").val(elem.css("text-align"));
    if (!gElements[id].align) {
        $("#elem_al").hide();
    }
    $("#elem_pl").show();
    if (elements[id].noText) {
        $("#elem_pl").hide();
    }
    $("#elem_id").val(id);
}
function closeEdit() {
    $(".settings input").val("");
    $(".jEditor div.settings").fadeOut();
}
function saveEdit() {
    var id = $("#elem_id").val();
    var elem = $("#object_" + id);
    elem.width($("#elem_w").val());
    elem.height($("#elem_h").val());
    elements[id].placeholder = $("#elem_p").val();
    elem.html(elements[id].placeholder + elements[id].value);
    elem.css("text-align", $("#elem_a option:selected").val());
    elem.css("font-size", $("#elem_f").val() + "px");
    unsaved();
}
function setPanel(n) {
    $(".bar.wide button").removeClass("selected");
    $(".bar.wide .p" + n).addClass("selected");
    $(".elements").hide();
    $("#panel_" + n).show();
    $("#saveBtn").show();
    if (n === 1) {
        $("#panel_1").css("height", "85%");
        $("#saveBtn").hide();
    }
}
function getValues() {
    var arr = [];
    $(".page .object").each(function () {
        var e = $(this);
        var id = e.attr('value') * 1;
        var placeh = elements[id].placeholder !== undefined ? elements[id].placeholder : "";
        var n = {elemento: id, size: e.css("font-size").replace("px", "") * 1, width: roundNumber(e.width()), height: roundNumber(e.height()), left: roundNumber(e.position().left), top: roundNumber(e.position().top), align: e.css("text-align"), placeholder: placeh};
        if (n.elemento === 8 || n.elemento === 9 || n.elemento <= 3) {
            n.value = e.html();
        }
        arr.push(n);
    });
    return arr;
}
function roundNumber(n) {
    return Math.round(n * 100) / 100;
}
function setValues(active) {
    active.forEach(function (i, index) {
        $("#el_" + i.id + " button.add").trigger("click");
        var obj = $("#object_" + i.id);
        obj.width(i.width);
        obj.height(i.height);
        obj.css("top", i.top);
        obj.css("left", i.left);
        obj.css("text-align", i.align);
        obj.css("font-size", i.size + "px");
        var placeh = i.placeholder !== null && i.placeholder !== undefined ? i.placeholder : "";
        elements[i.id].placeholder = placeh;
        if (i.value !== undefined) {
            obj.html(placeh + i.value);
        }
    });
    unsaved();
}
function setElements(elem) {
    elem.forEach(function (i, index) {
        $(".page").append("<div class='object' id='object_" + i.id + "'>" + (elements[i.id].placeholder === undefined ? "" : elements[i.id].placeholder) + (i.value === undefined ? elements[i.id].value : i.value) + "</div>");
        var obj = $("#object_" + i.id);
        obj.width(i.width);
        obj.height(i.height);
        obj.css("top", i.top);
        obj.css("left", i.left);
        obj.css("text-align", i.align);
    });
}
function showError(e) {
    var el = $(".document .error");
    el.html(e);
    el.fadeIn();
    setTimeout(function () {
        el.fadeOut();
    }, 3000);
}
function showSuccess(e) {
    var el = $(".document .success");
    el.html(e);
    el.fadeIn();
    setTimeout(function () {
        el.fadeOut();
    }, 3000);
}
function unsaved() {
    window.addEventListener("beforeunload", confirmation);
    $("#save_btn").css("background", "#4CAF50");
}
function confirmation(e) {
    var confirmationMessage = "Está a punto de salir sin guardar los cambios realizados, ¿Desea continuar?";
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Webkit, Safari, Chrome
}
function setBackground(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        setBackgroundImage(reader.result);
        setPanel("0");
    };
    reader.readAsDataURL(file);
}
function setBackgroundImage(image) {
    $(".page").css("background-image", 'url("' + image + '")');
}