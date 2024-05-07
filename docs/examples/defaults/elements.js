export const elements = [
  {
    key: "date",
    text: "Date",
    value: new Date().toLocaleString(),
    width: 300,
    height: 30,
    align: "right",
    placeholder: "Date: ",
  },
  {
    key: "title",
    text: "Title",
    value:
      "<h1 class='text-5xl'>jEditor</h1><h3 class='text-3xl'>A javascript document editor</h3><strong>Lorem ipsum dolor sit amec...</strong>",
    width: 600,
    height: 125,
    align: "center",
    settings: { fontSize: false, placeholder: false },
  },
  {
    key: "document-name",
    text: "Document Name",
    value: "Test Document 1",
    width: 600,
    height: 35,
    fontSize: 25,
    align: "left",
  },
  {
    key: "document-content",
    text: "Document Content",
    value:
      "<ul><li>Document content 1</li><li>Document content 2</li><li>Document content 3</li></ul>",
    width: 1150,
    height: 400,
    settings: { align: false, placeholder: false },
  },
  {
    key: "logo",
    text: "Logo",
    value:
      "<img src='https://via.placeholder.com/150' style='width: 100%;height: 100%;'>",
    width: 125,
    height: 125,
    settings: { align: false, fontSize: false, placeholder: false },
  },
  {
    key: "divider",
    text: "Line Divider",
    value:
      "<div style='margin-top: 5px; height: 2px !important; border: none; color: #565656; background-color: #565656;'></div>",
    width: 1150,
    height: 15,
    settings: { align: false, fontSize: false, placeholder: false },
  },
  {
    key: "signature",
    text: "Signature",
    value:
      "<div style='border-top: 2px solid black; padding: 0 10px 0 10px'><small>Signature</small></div>",
    width: 250,
    height: 30,
    align: "center",
    settings: { placeholder: false },
  },
];
