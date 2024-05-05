import { icon } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Component from "src/lib/components/component";

export default class Toasts
  extends Component
  implements EditorToasts, EditorSection
{
  constructor(parent: JEditor) {
    super(parent);
    this.render();
  }

  render() {
    let toasts;
    if (this.getSection() || this._rendered) {
      toasts = this.getSection();
      toasts.innerHTML = "";
      this._rendered = false;
    } else {
      // Create Toasts container
      toasts = document.createElement("div");
      toasts.setAttribute("data-container", "toasts");
      // Add to main container
      const container = document.querySelector(this.getOptions().container);
      container?.appendChild(toasts);
    }
    const sidebarPosition = this._parent.getOptions().sidebarPosition;
    const classPosition = sidebarPosition === "left" ? "right-0" : "left-0";
    toasts.className = `fixed top-14 ${classPosition} px-3 py-2 z-50 flex flex-col gap-2 justify-around`;
    this._rendered = true;
  }

  getSection(): HTMLElement {
    return document.querySelector(
      `${this.getOptions().container} [data-container='toasts']`
    ) as HTMLElement;
  }

  addToast(message: string, className?: string, timeout?: number): void {
    if (message) {
      // Toast element
      const toast = document.createElement("div");
      toast.className = `flex gap-5 max-w-xs text-white rounded-md shadow-lg p-4 ${className ?? "bg-neutral-500"}`;
      // Content
      const content = document.createElement("span");
      content.className = "grow";
      content.innerHTML = message;
      toast.appendChild(content);
      // Close button
      const button = document.createElement("button");
      button.className = "px-2 text-white/[.5] hover:text-white text-lg";
      button.innerHTML = icon(faXmark).html.toString();
      button.onclick = function () {
        const parent = <HTMLElement>(<HTMLElement>this).parentNode;
        parent?.remove();
      };
      toast.appendChild(button);
      // Set toast timeout
      this.getSection()?.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, timeout ?? this.getOptions().toastDuration);
    }
  }
}
