import { data } from "../defaults/data.js";
import { elements } from "../defaults/elements.js";

const { jsPDF } = window.jspdf;

const page = document.querySelector("#page");
// You can get these values from the editor using myEditor.getOptions()
const options = {
  paperSize: "half-letter",
  orientation: "landscape",
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
html2canvas(page).then(function (canvas) {
  const imgData = canvas.toDataURL("image/jpeg", 1);
  // Creating a new instance of jsPDF based on the paper size and orientation
  const pdf = new jsPDF({
    orientation: options.orientation,
    unit: "mm",
    format: paperSizes[options.paperSize],
  });
  // Getting the sizes for the page
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imageWidth = canvas.width;
  const imageHeight = canvas.height;
  const ratio =
    imageWidth / imageHeight >= pageWidth / pageHeight
      ? pageWidth / imageWidth
      : pageHeight / imageHeight;
  // Add the canvas to the PDF as a full page image
  pdf.addImage(imgData, "JPEG", 0, 0, imageWidth * ratio, imageHeight * ratio);
  // Set some PDF properties
  pdf.setDocumentProperties({
    title: "jEditor PDF example",
    author: "jEditor",
    keywords: "jEditor, js-document-editor, javascript, typescript",
  });
  // Replace the whole body with an iframe containing the generated PDF
  document.querySelector("body").innerHTML =
    `<iframe src="${pdf.output("datauristring")}" frameborder="0" style="position:fixed;border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`;
});
