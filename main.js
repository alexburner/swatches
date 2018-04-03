// assumes presence of:
// - document
// - d3.v5.js

const MIN_COLOR_COUNT = 3;

const SEED_COLORS = [
  "#7cafc2",
  "#86c1b9",
  "#a1b56c",
  "#f7ca88",
  "#dc9656",
  "#ba8baf"
];

// Scaler for mapping min-max to 0-1
const getNumberScale = (min, max) =>
  d3
    .scaleLinear()
    .domain([min, max])
    .range([0, 1]);

// Scaler for mapping 0-1 to a color sequence
const getColorScale = colors => {
  if (colors.length < 2) throw new Error("needs more colors");
  const lastIndex = colors.length - 1;
  const domain = colors.slice().map((color, i) => i / lastIndex);
  return d3
    .scaleLinear()
    .domain(domain)
    .range(colors)
    .interpolate(d3.interpolateHcl);
};

// Create a swatch from a list of colors
const createSwatch = colors => {
  const swatchEl = document.createElement("div");
  swatchEl.className = "swatch";
  colors.forEach(color => {
    const colorEl = document.createElement("div");
    colorEl.className = "color";
    colorEl.style.backgroundColor = color;
    swatchEl.appendChild(colorEl);
  });
  return swatchEl;
};

// Draw a sequence of swatches
const drawSwatches = count => {
  const colorScale = getColorScale(SEED_COLORS);
  for (let i = 0; i < count; i++) {
    console.log("");
    console.log(i);
    const indexScale = getNumberScale(0, Math.max(i, MIN_COLOR_COUNT));
    const colors = new Array(i + 1).fill(null).map((_x, i) => {
      console.log(i, indexScale(i), colorScale(indexScale(i)));
      return colorScale(indexScale(i));
    });
    const swatch = createSwatch(colors);
    document.body.appendChild(swatch);
  }
};

drawSwatches(20);
