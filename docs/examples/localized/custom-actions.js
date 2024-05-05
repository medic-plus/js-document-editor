import { defaultElements } from "./elements/default.js";
import { de_DE } from "./elements/de_DE.js";
import { en_EN } from "./elements/en_EN.js";
import { es_ES } from "./elements/es_ES.js";
import { fr_FR } from "./elements/fr_FR.js";
import { it_IT } from "./elements/it_IT.js";
import { zh_CN } from "./elements/zh_CN.js";

const changeLocale = (editor, data) => {
  const elements = defaultElements.map((element, index) => ({
    ...element,
    ...data.elements[index],
  }));
  customActions.forEach((action) => {
    action.className = `text-sm ${action.content === data.label ? "bg-primary-500" : ""}`;
  });
  editor.mergeOptions({ elements: elements, customActions: customActions });
  editor.setLocale(data.value);
  editor.render();
  editor.showToast(`${data.toast} <div class='text-sm'>${data.value}</div>`);
};

const localeData = [
  {
    label: "EN",
    value: "en_US",
    tooltip: "English (US)",
    elements: en_EN,
    toast: "Editor locale has been changed",
  },
  {
    label: "ES",
    value: "es_ES",
    tooltip: "Spanish (Spain)",
    elements: es_ES,
    toast: "El lenguaje del editor ha cambiado",
  },
  {
    label: "FR",
    value: "fr_FR",
    tooltip: "French (France)",
    elements: fr_FR,
    toast: "La langue de l'éditeur a été modifiée",
  },
  {
    label: "IT",
    value: "it_IT",
    tooltip: "Italian (Italy)",
    elements: it_IT,
    toast: "L' impostazione locale dell'editor è stata modificata",
  },
  {
    label: "DE",
    value: "de_DE",
    tooltip: "German (Germany)",
    elements: de_DE,
    toast: "Das Gebietsschema des Editors wurde geändert",
  },
  {
    label: "ZH",
    value: "zh_CN",
    tooltip: "Chinese simplified (China)",
    elements: zh_CN,
    toast: "编辑器区域设置已更改",
  },
];

export const customActions = localeData.map((data) => ({
  action: (editor) => changeLocale(editor, data),
  content: data.label,
  className: `text-sm ${data.label === "EN" ? "bg-primary-500" : ""}`,
  tooltip: data.tooltip,
}));
