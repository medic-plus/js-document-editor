import interact from "interactjs";
import {
  EDITOR_VALUES,
  allowEventListener,
  defaultEditorOptions as defaultOptions,
} from "src/lib/defaults";
import {
  getBoundariesPosition,
  getPaperSize,
  moveElementToPosition,
  pixelsToUnit,
  roundDecimals,
} from "src/lib/utils";
import {
  faFileArrowUp,
  faMagnifyingGlass,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Component from "src/lib/components/component";

export default class Editor
  extends Component
  implements EditorSection, EditorContainer
{
  constructor(parent: JEditor) {
    super(parent);
    this.render();
  }

  render() {
    let section;
    if (this.getSection() || this._rendered) {
      section = this.getSection();
      section.innerHTML = "";
      this._rendered = false;
    } else {
      // Create Container element
      section = document.createElement("main");
      section.setAttribute("data-container", "editor");
      // Add to main container
      const container = document.querySelector(this.getOptions().container);
      container?.appendChild(section);
    }
    // Info banner
    const banner = document.createElement("div");
    banner.className = "flex justify-evenly items-center bg-primary-800 py-2";
    banner.setAttribute("data-container", "banner");
    section.appendChild(banner);
    // Page wrapper
    const pageWrapper = document.createElement("div");
    pageWrapper.className =
      "grow justify-center overflow-auto p-10 bg-neutral-700";
    pageWrapper.setAttribute("data-container", "page-wrapper");
    section.appendChild(pageWrapper);
    // Page element
    const page = document.createElement("div");
    page.setAttribute("data-container", "page");
    pageWrapper.appendChild(page);
    // Call sub-render and setter functions
    this.setPaperSize(this.getOptions().paperSize);
    this.renderBanner();
    this.renderElements();
    this.initArrowMoveListener();
    this.setPageBackground();
    this.resetZoom();
    this._rendered = true;
  }

  renderBanner() {
    const banner = this.getBanner();
    banner.innerHTML = "";
    const options = this.getOptions();
    // Page size
    const pageSizeDiv = document.createElement("div");
    const paper = getPaperSize(options, options.paperSize);
    pageSizeDiv.innerHTML = `${icon(faRulerCombined).html.toString()} ${paper.displayName}`;
    if (paper.description) {
      const description = document.createElement("span");
      description.innerHTML = `(${paper.description})`;
      description.className = "hidden md:flex";
      pageSizeDiv.appendChild(description);
    }
    // Page orientation
    const pageOrientationDiv = document.createElement("div");
    const orientation = this.getOptions().orientation ?? "portrait";
    const orientationLocalized = this.getLocalizedText(orientation);
    pageOrientationDiv.innerHTML = `${icon(faFileArrowUp).html.toString()} ${orientationLocalized}`;
    // Zoom level
    const zoomDiv = document.createElement("div");
    zoomDiv.innerHTML = `${icon(faMagnifyingGlass).html.toString()} ${options.zoom}%`;
    banner.appendChild(pageOrientationDiv);
    banner.appendChild(pageSizeDiv);
    banner.appendChild(zoomDiv);
  }

  renderElements() {
    const editorMode = this.getEditorMode();
    this.getPage().innerHTML = "";
    this.getData().map((data) => {
      const elements = this.getOptions().elements;
      const element = elements.find((element) => element.key === data.element);
      if (element) {
        const container = this.createElementObject(data, element, editorMode);
        this.getPage().appendChild(container);
      }
    });
    const selector = `${this.getOptions().container} .page .element`;
    this.initDraggableElements(selector, editorMode);
    this.initResizableElements(selector, editorMode);
  }

  private createElementObject(
    data: EditorData,
    element: EditorElement,
    editorMode: boolean | undefined
  ) {
    const _this = this;
    const container = document.createElement("div");
    container.className = "element";
    container.setAttribute("data-key", data.element);
    container.setAttribute("data-text", element.text);
    container.style.width = data.width + "px";
    container.style.height = data.height + "px";
    container.style.top = data.top + "px";
    container.style.left = data.left + "px";
    container.style.textAlign = data.align ?? element.align ?? "initial";
    container.style.fontSize = `${
      data.fontSize ??
      element.fontSize ??
      this.getOptions().fontSize ??
      EDITOR_VALUES.fontSize
    }px`;
    const placeholder = data.placeholder ?? element.placeholder ?? "";
    container.innerHTML = placeholder + element.value;
    container.onclick = () => {
      if (_this.getEditorMode()) {
        this.selectElement(data.element);
        this.getSidebar().showDetails(data.element);
      }
    };
    if (!editorMode) {
      container.classList.add("rendered");
    }
    return container;
  }

  getSection(): HTMLElement {
    return document.querySelector(
      `${this.getOptions().container} [data-container="editor"]`
    ) as HTMLElement;
  }

  getBanner(): HTMLElement {
    return this.getSection().querySelector(
      `[data-container="banner"]`
    ) as HTMLElement;
  }

  getPageWrapper(): HTMLElement {
    return this.getSection().querySelector(
      `[data-container="page-wrapper"]`
    ) as HTMLElement;
  }

  getPage(): HTMLElement {
    return this.getSection().querySelector(
      `[data-container="page"]`
    ) as HTMLElement;
  }

  getElement(key: string): HTMLElement {
    return this.getPage().querySelector(`[data-key="${key}"]`) as HTMLElement;
  }

  getActiveElement(): HTMLElement | undefined {
    return this.getPage().querySelector(`.element.active`) as HTMLElement;
  }

  private triggerChange(event: string, key?: string) {
    if (this.getOptions().onEditorChange && this._rendered) {
      if (key) {
        const data = this._parent.getElementData(key);
        this.getOptions().onEditorChange(this._parent, event, data ?? key);
      } else {
        this.getOptions().onEditorChange(this._parent, event);
      }
      this.triggerParent("editor", event);
    }
  }

  setPaperSize(paperName?: string, orientation?: string) {
    const page = this.getPage();
    const options = this.getOptions();
    if (paperName || orientation) {
      const paperSize = getPaperSize(options, paperName);
      const customOrientation =
        options.forceOrientation && paperSize.orientation
          ? paperSize.orientation
          : options.orientation;
      orientation =
        orientation ?? customOrientation ?? EDITOR_VALUES.orientation;
      page.className = `page ${paperSize.name} ${orientation}`;
      this._parent.mergeOptions({ paperSize: paperSize.name, orientation });
      console.debug("Set paper size: %s (%s)", paperSize.name, orientation);
      this.triggerChange("setPaperSize");
      this.renderBanner();
    }
  }

  setZoom(value: number) {
    const page = this.getPage();
    if (page) {
      (page.style as any).zoom = value / 100;
      this.triggerChange("setZoom");
      this.renderBanner();
    }
  }

  private calculateZoom(increase: boolean) {
    const actual = this.getOptions().zoom ?? defaultOptions.zoom ?? 1;
    const increment =
      this.getOptions().zoomIncrement ?? defaultOptions.zoomIncrement ?? 1;
    const zoom = Math.trunc(actual + (increase ? increment : -increment));
    if (zoom > 0) {
      console.debug("Zoom %s: %d%", increase ? "in" : "out", zoom);
      this._parent.mergeOptions({ zoom: zoom });
      this.setZoom(zoom);
    }
  }

  zoomIn() {
    this.calculateZoom(true);
  }

  zoomOut() {
    this.calculateZoom(false);
  }

  resetZoom() {
    const containerWidth = this.getPageWrapper().offsetWidth;
    const pageWith = this.getPage().offsetWidth;
    const zoomThreshold = this.getOptions().zoomThreshold ?? 0;
    const zoom = roundDecimals(containerWidth / pageWith, 2) - zoomThreshold;
    const fixedZoom = Math.trunc(parseFloat(zoom.toFixed(2)) * 100);
    this._parent.mergeOptions({ zoom: fixedZoom });
    console.debug("Reset zoom: %d%", fixedZoom);
    this.setZoom(fixedZoom);
  }

  deselectActiveElement() {
    const active = this.getActiveElement();
    if (active) {
      active.classList.remove("active");
    }
  }

  elementTrigger(element: HTMLElement) {
    const key = element.getAttribute("data-key");
    if (key && this.hasData(key)) {
      this.mergeData(key, {
        width: element.offsetWidth,
        height: element.offsetHeight,
        top: element.offsetTop,
        left: element.offsetLeft,
      });
      console.debug("Data for %s was saved", key);
      this.triggerChange("elementTrigger", key);
    }
  }

  getHTMLObject(key: string): HTMLElement {
    return this.getPage().querySelector(
      `.element[data-key='${key}']`
    ) as HTMLElement;
  }

  getElementDetails(item: HTMLElement | string): ElementDetails {
    const elem = item instanceof HTMLElement ? item : this.getHTMLObject(item);
    const options = this.getOptions();
    let height = pixelsToUnit(options, elem.offsetHeight) + options.units;
    let width = pixelsToUnit(options, elem.offsetWidth) + options.units;
    let top = pixelsToUnit(options, elem.offsetTop) + options.units;
    let left = pixelsToUnit(options, elem.offsetLeft) + options.units;
    return { height, width, top, left };
  }

  selectElement(key: string) {
    const element = this.getHTMLObject(key);
    if (element && this.getEditorMode()) {
      this.deselectActiveElement();
      element.classList.add("active");
    }
  }

  initResizableElements(selector: string, editorMode: boolean) {
    const _this = this;
    if (!editorMode) {
      interact(selector).resizable(false);
      return;
    }
    document.querySelectorAll(selector).forEach((object) => {
      var positions = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
      positions.forEach(function (position) {
        var handle = document.createElement("div");
        var edge =
          position.length > 1 ? position.split("").join("-edge ") : position;
        handle.className = `handles ${position}-cursor ${edge}-edge`;
        object.appendChild(handle);
      });
    });
    interact(selector)
      .resizable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
          }),
          interact.modifiers.restrictSize({
            min: { width: 10, height: 10 },
          }),
        ],
        edges: {
          top: ".n-edge",
          left: ".w-edge",
          bottom: ".s-edge",
          right: ".e-edge",
        },
        listeners: {
          move: function (event) {
            event.stopPropagation();
            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              top: `${event.target.offsetTop + event.deltaRect.top}px`,
              left: `${event.target.offsetLeft + event.deltaRect.left}px`,
            });
            const key = event.target.getAttribute("data-key");
            _this.getSidebar().showDetails(key);
          },
        },
      })
      .on("resizeend", function (event) {
        _this.elementTrigger(event.target);
      });
  }

  initDraggableElements(selector: string, editorMode: boolean) {
    const _this = this;
    const dragSnap = this.getOptions().dragStep ?? 1;
    if (!editorMode) {
      interact(selector).draggable(false);
      return;
    }
    interact(selector)
      .draggable({
        modifiers: [
          interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: dragSnap, y: dragSnap })],
          }),
          interact.modifiers.restrictRect({
            restriction: "parent",
          }),
        ],
        listeners: {
          move(event) {
            if (_this.getEditorMode()) {
              _this.deselectActiveElement();
              event.target.classList.add("active");
              event.target.style.top = `${event.target.offsetTop + event.dy}px`;
              event.target.style.left = `${event.target.offsetLeft + event.dx}px`;
              const key = event.target.getAttribute("data-key");
              _this.getSidebar().showDetails(key);
            }
          },
        },
      })
      .on("dragend", (event) => {
        if (_this.getEditorMode()) {
          _this.elementTrigger(event.target);
        }
      });
  }

  private initArrowMoveListener() {
    const parent = this._parent;
    const eventFunction = (event: any) =>
      this.arrowEventListener(parent, event);
    window.removeEventListener("keydown", eventFunction);
    if (this.getEditorMode()) {
      window.addEventListener("keydown", eventFunction);
    }
  }

  private arrowEventListener(editor: JEditor, event: any) {
    const element = editor.getEditor().getActiveElement();
    const editorMode = editor.getOptions().editorMode;
    const focusElement = document.activeElement?.nodeName?.toLowerCase() ?? "";
    if (editorMode && element && !allowEventListener.includes(focusElement)) {
      const arrowStep = editor.getOptions().arrowStep ?? 1;
      const arrowShift = editor.getOptions().arrowShiftStep ?? 5;
      const step = event.shiftKey ? arrowShift : arrowStep;
      const code = event.code;
      if (code.includes("Arrow")) {
        event.preventDefault();
        let top = element.offsetTop;
        let left = element.offsetLeft;

        switch (code) {
          case "ArrowRight":
            element.style.left = `${getBoundariesPosition(element, left + step)}px`;
            break;
          case "ArrowLeft":
            element.style.left = `${getBoundariesPosition(element, left - step)}px`;
            break;
          case "ArrowUp":
            element.style.top = `${getBoundariesPosition(element, top - step, true)}px`;
            break;
          case "ArrowDown":
            element.style.top = `${getBoundariesPosition(element, top + step, true)}px`;
            break;
        }
        editor.getSidebar().showDetails(element.getAttribute("data-key") ?? "");
        this.elementTrigger(element);
      }
    }
  }

  setElementPosition(key: string | null, x?: number, y?: number) {
    const element = key ? this.getElement(key) : this.getActiveElement();
    if (element) {
      if (x) {
        element.style.left = `${getBoundariesPosition(element, x)}px`;
      }
      if (y) {
        element.style.top = `${getBoundariesPosition(element, y, true)}px`;
      }
      this.elementTrigger(element);
    }
  }

  setElementCardinalPosition(
    key: string | null,
    position: string,
    value?: string
  ) {
    const element = key ? this.getElement(key) : this.getActiveElement();
    console.debug("Moving element %s to %s %s", key, position, value);
    if (element) {
      moveElementToPosition(element, position, value);
      this.elementTrigger(element);
    }
  }

  setPageBackground(): void {
    const page = this.getPage();
    const background = this.getOptions().background;
    const isString = typeof background === "string";
    const url = isString ? background : background?.url;
    page.style.backgroundImage = url ? `url(${url})` : "";
    page.style.removeProperty("background-size");
    page.style.removeProperty("background-repeat");
    page.style.removeProperty("background-position");
    if (!isString) {
      page.style.backgroundSize = background?.size ?? "initial";
      page.style.backgroundRepeat = background?.repeat ?? "initial";
      page.style.backgroundPosition = background?.position ?? "initial";
    }
    this.triggerChange("setPageBackground");
  }
}
