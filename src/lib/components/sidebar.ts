import { icon } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getNextPageSize } from "src/lib/utils";
import Component from "src/lib/components/component";

export default class SideBar
  extends Component
  implements EditorSideBar, EditorSection
{
  constructor(parent: JEditor) {
    super(parent);
    this.render();
  }

  render() {
    if (this.getSection()) {
      this.getSection().remove();
    }
    // Sidebar element
    const sidebar = document.createElement("aside");
    sidebar.setAttribute("data-container", "sidebar");
    // Editor title
    const title = document.createElement("h1");
    title.className = `text-xl font-bold py-3 bg-primary-700 w-full text-center`;
    title.innerHTML = this.getOptions().title ?? "jEditor";
    sidebar.appendChild(title);
    // Elements list
    const elementsList = document.createElement("ul");
    elementsList.setAttribute("data-container", "elements");
    elementsList.className = "grow w-full overflow-y-auto";
    sidebar.appendChild(elementsList);
    // Custom toolbar
    const customToolbar = document.createElement("div");
    customToolbar.setAttribute("data-container", "custom-toolbar");
    customToolbar.className = `bottom-0 gap-1 p-1 ${this.getOptions().customToolbarClassName ?? "flex flex-row"}`;
    sidebar.appendChild(customToolbar);
    // Toolbar
    const toolbar = document.createElement("div");
    toolbar.setAttribute("data-container", "toolbar");
    toolbar.className = "bottom-0 flex flex-row gap-1 p-1";
    sidebar.appendChild(toolbar);
    // Add to main container
    const container = document.querySelector(this.getOptions().container);
    container?.appendChild(sidebar);
    this.renderElementsList();
    this.renderCustomToolbar();
    this.renderToolbar();
  }

  renderCustomToolbar() {
    const parent = this._parent;
    const toolbar = this.getCustomToolbar();
    toolbar.innerHTML = "";
    this.getOptions().customToolbarActions?.map((tbAction) => {
      const button = document.createElement("button");
      button.className = `group ${tbAction.className ?? ""}`;
      button.innerHTML = tbAction.content;
      button.onclick = () => tbAction.action(parent);
      // Button tooltip
      if (tbAction.tooltip) {
        const tooltip = this.createTooltipElement(tbAction.tooltip);
        button.appendChild(tooltip);
      }
      toolbar.appendChild(button);
    });
  }

  renderToolbar() {
    const toolbar = this.getToolbar();
    toolbar.innerHTML = "";
    this.getOptions().toolbarActions?.map((tbAction) => {
      const button = document.createElement("button");
      button.className = `group ${tbAction.className ?? ""}`;
      button.innerHTML = tbAction.content;
      button.onclick = () => this.toolbarAction(tbAction.name);
      // Button tooltip
      const tooltip = this.createTooltipElement(
        tbAction.label ?? this.getLocalizedText(tbAction.name)
      );
      button.appendChild(tooltip);
      toolbar.appendChild(button);
    });
  }

  renderElementsList() {
    const list = this.getElementsList();
    list.innerHTML = "";
    this.getOptions().elements.forEach((element) => {
      const item = document.createElement("li");
      item.className = "hover:!bg-primary-900 border-b border-black/[0.2]";
      const wrapper = document.createElement("div");
      wrapper.className = "w-full flex flex-row gap-2";
      if (this.hasData(element.key)) {
        item.classList.add("in-editor");
      }
      item.setAttribute("data-key", element.key);
      const content = document.createElement("button");
      content.className = "py-2 px-3 grow text-left";
      content.innerHTML = element.text;
      content.onclick = () => this.clickElementListItem(element.key);
      // Properties button
      const button = document.createElement("button");
      button.className = `action hidden px-3 bg-black/[.2] hover:bg-primary-500`;
      button.innerHTML = icon(faXmark).html.toString();
      button.onclick = () => this.hideElementListItem(element.key);
      // Details div
      const details = document.createElement("div");
      details.setAttribute("data-container", "details");
      details.className = "p-2 bg-neutral-600 hidden gap-1";
      wrapper.appendChild(content);
      if (this.getEditorMode()) {
        wrapper.appendChild(button);
      }
      item.appendChild(wrapper);
      item.appendChild(details);
      list.appendChild(item);
    });
  }

  private createTooltipElement(content: string): HTMLElement {
    const tooltip = document.createElement("span");
    tooltip.className = `group-hover:visible rounded shadow-lg p-2 bg-neutral-400 text-white -mt-10 invisible absolute z-50`;
    tooltip.innerHTML = content;
    return tooltip;
  }

  getSection(): HTMLElement {
    return document.querySelector(
      `${this.getOptions().container} [data-container='sidebar']`
    ) as HTMLElement;
  }

  getToolbar(): HTMLElement {
    return this.getSection().querySelector(
      `[data-container='toolbar']`
    ) as HTMLElement;
  }

  getElementsList(): HTMLElement {
    return this.getSection().querySelector(
      `[data-container='elements']`
    ) as HTMLElement;
  }

  getCustomToolbar(): HTMLElement {
    return this.getSection().querySelector(
      `[data-container='custom-toolbar']`
    ) as HTMLElement;
  }

  getElementsListItem(key: string): HTMLElement | undefined {
    return this.getElementsList().querySelector(
      `[data-key='${key}']`
    ) as HTMLElement;
  }

  clickElementListItem(key: string): void {
    if (!this.hasData(key)) {
      this.showElementListItem(key);
    } else if (this.getEditorMode()) {
      this.getEditor().selectElement(key);
      this.showDetails(key);
    }
  }

  showElementListItem(key: string): void {
    if (!this.hasData(key)) {
      const element = this.getOptions().elements.find((e) => e.key === key);
      if (element) {
        const data = {
          element: key,
          width: element.width,
          height: element.height,
          left: 0,
          top: 0,
          align: element.align,
          fontSize: element.fontSize,
        } as EditorData;
        this._parent.pushData(data);
        this.getEditor().renderElements();
        this.renderElementsList();
        this.clickElementListItem(key);
      }
    }
  }

  hideElementListItem(key: string): void {
    if (this.hasData(key)) {
      this._parent.pullData(key);
      this.getEditor().renderElements();
      this.renderElementsList();
    }
  }

  toolbarAction(action: string) {
    switch (action) {
      case "toggleEditor":
        this._parent.mergeOptions({
          editorMode: !(this.getOptions().editorMode ?? true),
        });
        this.renderElementsList();
        return this._parent.renderElements();
      case "zoomIn":
        return this.getEditor().zoomIn();
      case "zoomOut":
        return this.getEditor().zoomOut();
      case "zoomReset":
        return this.getEditor().resetZoom();
      case "paperSize":
        const paper = getNextPageSize(this.getOptions());
        return this._parent.setPaperSize(paper.name);
      case "rotate":
        const isPortrait = this.getOptions().orientation === "portrait";
        return this.getEditor().setPaperSize(
          this.getOptions().paperSize,
          isPortrait ? "landscape" : "portrait"
        );
    }
  }

  showDetails(key: string) {
    this.hiddeDetails();
    const li = this.getElementsListItem(key);
    const container = li?.querySelector("[data-container='details']");
    if (li && container) {
      container.innerHTML = "";
      const details = this.getEditor().getElementDetails(key);
      const element = this.getOptions().elements.find((e) => e.key === key);
      const data = this._parent.getElementData(key);
      container.append(this.detailsProperties(details));
      const legend = document.createElement("p");
      legend.className = "legend";
      if (element) {
        if (element.settings?.fontSize !== false) {
          const fontLegend = legend.cloneNode() as HTMLElement;
          fontLegend.innerHTML = this.getLocalizedText("fontSize");
          container.append(fontLegend);
          container.append(this.detailsFontSize(element, data));
        }
        if (element.settings?.placeholder !== false) {
          const placeholderLegend = legend.cloneNode() as HTMLElement;
          placeholderLegend.innerHTML = this.getLocalizedText("placeholder");
          container.append(placeholderLegend);
          container.append(this.detailsPlaceholder(element, data));
        }
        if (element.settings?.align !== false) {
          const alignLegend = legend.cloneNode() as HTMLElement;
          alignLegend.innerHTML = this.getLocalizedText("textAlign");
          container.append(alignLegend);
          container.append(this.detailsAlign(element, data));
        }
        const posLegend = legend.cloneNode() as HTMLElement;
        posLegend.innerHTML = this.getLocalizedText("alignElement");
        container.append(posLegend);
        container.append(this.detailsPosition(element));
      }
      li.classList.add("selected");
    }
  }

  private detailsProperties(details: ElementDetails): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("container", "properties-wrapper");
    const properties = this.getOptions().detailProperties ?? [];
    if (properties.length === 0) {
      return wrapper;
    }
    properties.map((prop) => {
      const key = prop.value as keyof ElementDetails;
      const property = document.createElement("div");
      const textIcon = icon(prop.icon).html.toString();
      const propertyTxt = textIcon + this.getLocalizedText(prop.localeText);
      property.innerHTML = `${propertyTxt}: <span class='font-bold'>${details[key]}</span>`;
      property.className = "property";
      wrapper.append(property);
    });
    wrapper.className = "grow grid grid-cols-2 gap-1 mb-2";
    return wrapper;
  }

  private detailsAlign(element: EditorElement, data?: EditorData): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("container", "align-wrapper");
    const buttons = this.getOptions().alignButtons ?? [];
    if (buttons.length === 0) {
      return wrapper;
    }
    buttons.forEach((align) => {
      const button = document.createElement("button");
      button.className = `group`;
      if (data?.align === align.value || (!data?.align && align.default)) {
        button.classList.add("active");
      }
      button.innerHTML = icon(align.icon).html.toString();
      button.onclick = () => {
        console.debug("Align %s: %s", element.key, align.value);
        this.mergeData(element.key, { align: align.value });
        this.getEditor().renderElements();
        this.getEditor().selectElement(element.key);
      };
      button.append(
        this.createTooltipElement(this.getLocalizedText(align.localeText))
      );
      wrapper.append(button);
    });
    wrapper.className = "grow grid grid-cols-4 gap-1 mb-2";
    return wrapper;
  }

  private detailsFontSize(
    element: EditorElement,
    data?: EditorData
  ): HTMLElement {
    const parent = this._parent;
    const wrapper = document.createElement("div");
    wrapper.className = "grow flex mb-2";
    wrapper.setAttribute("container", "font-size-wrapper");
    const input = document.createElement("input");
    const fontSizeChange = (event: any) => {
      parent.mergeData(element.key, { fontSize: event.target.value * 1 });
      parent.renderElements();
      parent.getEditor().selectElement(element.key);
    };
    const fontSize =
      data?.fontSize ?? element.fontSize ?? this.getOptions().fontSize;
    input.value = (fontSize ?? "") as string;
    input.type = "number";
    input.setAttribute("data-key", element.key);
    input.onchange = fontSizeChange;
    input.onkeyup = fontSizeChange;
    wrapper.append(input);
    return wrapper;
  }

  private detailsPlaceholder(
    element: EditorElement,
    data?: EditorData
  ): HTMLElement {
    const parent = this._parent;
    const wrapper = document.createElement("div");
    wrapper.className = "grow flex mb-2";
    wrapper.setAttribute("container", "placeholder-wrapper");
    const input = document.createElement("input");
    const placeholderChange = (event: any) => {
      parent.mergeData(element.key, { placeholder: event.target.value });
      parent.renderElements();
      parent.getEditor().selectElement(element.key);
    };
    input.value = data?.placeholder ?? element.placeholder ?? "";
    input.type = "text";
    input.setAttribute("data-key", element.key);
    input.onchange = placeholderChange;
    input.onkeyup = placeholderChange;
    wrapper.append(input);
    return wrapper;
  }

  private detailsPosition(element: EditorElement): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("container", "position-wrapper");
    const positions = this.getOptions().positionButtons ?? [];
    if (positions.length === 0) {
      return wrapper;
    }
    positions.forEach((position) => {
      const button = document.createElement("button");
      if (position.localeText) {
        button.innerHTML = this.getLocalizedText(position.localeText);
        button.className = position.className ?? "";
      } else {
        const iconDiv = document.createElement("div");
        iconDiv.innerHTML = icon(position.icon).html.toString();
        iconDiv.className = position.className ?? "";
        button.append(iconDiv);
      }
      button.onclick = () => {
        position.action(this._parent, element.key);
      };
      wrapper.append(button);
    });
    wrapper.className = `grow grid gap-1 ${this.getOptions().positionButtonsClassName ?? "grid-cols-2"}`;
    return wrapper;
  }

  hiddeDetails() {
    const selector = ".selected";
    const activeDetails = this.getSection().querySelectorAll(selector);
    activeDetails.forEach((detail) => detail.classList.remove("selected"));
  }
}
