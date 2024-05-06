import { data } from "../defaults/data.js";
import { elements } from "../defaults/elements.js";

// These two libraries are required to create the PDF from HTML code
import html2canvas from "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/polyfills.es.js";
import { jsPDF } from "https://unpkg.com/jspdf@latest/dist/jspdf.es.min.js";

const page = document.querySelector("#page");
// You can get these values from the editor using myEditor.getOptions()
const options = {
  paperSize: "half-letter",
  orientation: "portrait",
  fontSize: 16,
};

// Setting the page size and orientation
page.className = `page ${options.paperSize} ${options.orientation}`;

// Function to create the HTML object for each element (you can make your own implementation)
/*
    Returns an HTML object with this format: 
    <div class="element rendered"
      style="width: Xpx; height: Xpx; top: Xpx; left: Xpx; fontSize: Xpx; text-align: value;"
    >
      [placeholder] [value]
    </div>
 */
const createElementObject = (data, element) => {
  const object = document.createElement("div");
  // Setting the element rendered to display on the
  object.className = "element rendered";
  // Setting style properties from data or default element value
  object.style.width = `${data.width}px`;
  object.style.height = `${data.height}px`;
  object.style.top = `${data.top}px`;
  object.style.left = `${data.left}px`;
  object.style.textAlign = data.align ?? element.align ?? "initial";
  object.style.fontSize = `${
    data.fontSize ?? element.fontSize ?? options.fontSize
  }px`;
  // Setting the element contents
  const placeholder = data.placeholder ?? element.placeholder ?? "";
  object.innerHTML = placeholder + element.value;
  return object;
};

// Add all elements to the page
data.forEach((elementData) => {
  const element = elements.find((e) => e.key === elementData.element);
  const object = createElementObject(elementData, element);
  page.appendChild(object);
});

// Paper sizes in milimeters to use with jsPDF
const paperSizes = {
  letter: [215.9, 279.4],
  "half-letter": [215.9, 139.7],
  legal: [215.9, 355.6],
  tabloid: [279, 432],
  a3: [297, 420],
  a4: [210, 297],
  a5: [148.5, 210],
};

// Converting the HTML code to a canvas object
const pdf = new jsPDF({
  orientation: options.orientation,
  unit: "mm",
  format: paperSizes[options.paperSize],
});
html2canvas(page).then(function (canvas) {
  var imgData = canvas.toDataURL("image/jpeg", 1);
  var pdf = new jsPDF({
    orientation: options.orientation,
    unit: "mm",
    format: paperSizes[options.paperSize],
  });
  var pageWidth = pdf.internal.pageSize.getWidth();
  var pageHeight = pdf.internal.pageSize.getHeight();
  var imageWidth = canvas.width;
  var imageHeight = canvas.height;
  var ratio =
    imageWidth / imageHeight >= pageWidth / pageHeight
      ? pageWidth / imageWidth
      : pageHeight / imageHeight;
  pdf.addImage(imgData, "JPEG", 0, 0, imageWidth * ratio, imageHeight * ratio);
  document.querySelector("body").innerHTML =
    `<iframe src="${pdf.output("datauristring")}" frameborder="0" style="position:fixed;border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`;
});
