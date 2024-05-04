export const getDefaultPaper = (options: EditorOptions): PaperSize => {
  if (options.paperSizes && options.paperSizes.length > 0) {
    const defaultPaper = options.paperSizes.find((paper) => paper.default);
    return defaultPaper ?? options.paperSizes[0];
  }
  throw Error("Paper sizes have not been set");
};

export const getPaperSize = (
  options: EditorOptions,
  paperName?: string
): PaperSize => {
  if (paperName) {
    const size = options.paperSizes?.find((size) => size.name === paperName);
    return size ?? getDefaultPaper(options);
  }
  return getDefaultPaper(options);
};

export const getNextPageSize = (options: EditorOptions): PaperSize => {
  const sizes = options.paperSizes;
  let actual = getPaperSize(options, options.paperSize);
  const index = sizes?.findIndex((size) => size.name === actual.name);
  if (index !== undefined && index !== -1 && sizes) {
    const newIndex = index + 1 >= sizes.length ? 0 : index + 1;
    return sizes[newIndex];
  }
  return actual;
};

export const pixelsToUnit = (options: EditorOptions, value: number): number => {
  const dpi = options.dpi ?? 150;
  const decimals = options.decimals ?? 2;
  const INCH_TO_MM = 25.4;
  switch (options.units) {
    case "mm":
      return roundDecimals((INCH_TO_MM * value) / dpi, decimals);
    case "cm":
      return roundDecimals((INCH_TO_MM * value) / dpi / 10, decimals);
    case "in":
    case "inch":
      return roundDecimals(value / dpi, decimals);
    default:
      return roundDecimals(value, decimals);
  }
};

export const roundDecimals = (value: number, decimals: number): number => {
  return Number(value.toFixed(decimals));
};

export const getBoundariesPosition = (
  element: HTMLElement,
  value: number,
  vertical: boolean = false
): number => {
  const page = element.parentNode as HTMLElement;
  if (value < 0) return 0;
  let offset = 0;
  if (vertical) {
    offset = page.offsetHeight - element.offsetHeight;
  } else {
    offset = page.offsetWidth - element.offsetWidth;
  }
  return offset - value < 0 ? offset : value;
};

export const moveElementToPosition = (
  element: HTMLElement,
  position: string,
  value?: string
) => {
  position = position.toLowerCase();
  const page = element.parentNode as HTMLElement;
  const centerLeft = `${page.offsetWidth / 2 - element.offsetWidth / 2}px`;
  const centerTop = `${page.offsetHeight / 2 - element.offsetHeight / 2}px`;
  const maxLeft = `${page.offsetWidth - element.offsetWidth}px`;
  const maxTop = `${page.offsetHeight - element.offsetHeight}px`;
  const positionLeft = position.includes("w") ? "0px" : maxLeft;

  switch (position) {
    case "nw":
    case "ne":
    case "n":
      element.style.top = value ?? "0px";
      if (position !== "n") {
        element.style.left = value ?? positionLeft;
      }
      break;
    case "sw":
    case "se":
    case "s":
      element.style.top = value ?? maxTop;
      if (position !== "s") {
        element.style.left = value ?? positionLeft;
      }
      break;
    case "w":
    case "e":
      element.style.left = value ?? positionLeft;
      break;
    case "c":
      if (value === "vertical" || value === "v") {
        element.style.top = centerTop;
      } else if (value === "horizontal" || value === "h") {
        element.style.left = centerLeft;
      } else {
        element.style.top = centerTop;
        element.style.left = centerLeft;
      }
      break;
  }
};

export const isObject = (item: any) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeep = (target: any, source: any) => {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};
