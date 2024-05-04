const paperSizes = [
  {
    name: "letter",
    displayName: "Carta",
    description: "21.6cm x 27.9cm",
    width: 1275,
    height: 1650,
    default: true,
  },
  {
    name: "half-letter",
    displayName: "Media carta",
    description: "21.6cm x 14.0cm",
    width: 1275,
    height: 825,
    default: false,
  },
  {
    name: "a4",
    displayName: "A4",
    description: "21.0cm x 29.7cm",
    width: 1240,
    height: 1754,
    default: false,
  },
  {
    name: "a5",
    displayName: "A5",
    description: "14.8cm x 21.0cm",
    width: 874,
    height: 1240,
    default: false,
  },
];

export default paperSizes;
