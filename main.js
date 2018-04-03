// assumes presence of:
// - document
// - d3.v5.js

const MIN_COLOR_COUNT = 4;

const SEED_COLORS = [
  "#7cafc2",
  "#86c1b9",
  "#a1b56c",
  "#f7ca88",
  "#dc9656",
  "#ba8baf"
];

// Scaling fn for mapping 0-1 to a color sequence
const getColorScale = colors => {
  if (colors.length < 2) throw new Error("needs more colors");
  const lastIndex = colors.length - 1;
  const domain = colors.slice().map((_x, i) => i / lastIndex);
  return d3
    .scaleLinear()
    .domain(domain)
    .range(colors)
    .interpolate(d3.interpolateHcl);
};

// Scaling fn for mapping an array's indices to 0-1
const getIndexScale = length =>
  d3
    .scaleLinear()
    .domain([0, length - 1])
    .range([0, 1]);

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
  for (let swatchIndex = 0; swatchIndex < count; swatchIndex++) {
    const colorCount = swatchIndex + 1;
    console.log("");
    console.log("swatch", colorCount);
    const indexScale = getIndexScale(Math.max(colorCount, MIN_COLOR_COUNT));
    const colors = new Array(colorCount).fill(null).map((_x, colorIndex) => {
      console.log(
        colorIndex,
        Number(indexScale(colorIndex).toFixed(2)),
        colorScale(indexScale(colorIndex))
      );
      return colorScale(indexScale(colorIndex));
    });
    const swatch = createSwatch(colors);
    document.body.appendChild(swatch);
  }
};

drawSwatches(20);
