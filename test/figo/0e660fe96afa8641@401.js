export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["owl.jpg",new URL("./files/owl.jpg",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));

  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>Replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer("graphic")).define("graphic", ["replay","TinyQueue","Quad","width","DOM","d3"], function*(replay,TinyQueue,Quad,width,DOM,d3)
{
  replay;
  const quads = new TinyQueue([new Quad(0, 0, width, width)], (a, b) => b.score - a.score);
  const context = DOM.context2d(width, width);
  context.canvas.style.width = "100%";
  for (let i = 0; true; ++i) {
    const q = quads.pop();
    if (q === undefined || q.score < 50) break;
    const qs = q.split();
    const qsi = d3.interpolate([q, q, q, q], qs);
    qs.forEach(quads.push, quads);
    for (let j = 1, m = Math.max(1, Math.floor(q.w / 10)); j <= m; ++j) {
      const t = d3.easeCubicInOut(j / m);
      context.clearRect(q.x, q.y, q.w, q.h);
      for (const s of qsi(t)) {
        context.fillStyle = s.color;
        context.beginPath()
        context.moveTo(s.x + s.w, s.y + s.h / 2);
        context.arc(s.x + s.w / 2, s.y + s.h / 2, s.w / 2, 0, 2 * Math.PI);
        context.fill();
      }
      yield context.canvas;
    }
  }
}
);
  main.variable(observer("width")).define("width", function(){return(
1024
)});
  main.variable(observer("area_power")).define("area_power", function(){return(
0.25
)});
  main.variable(observer("Quad")).define("Quad", ["colorFromHistogram","computeHistogram","area_power"], function(colorFromHistogram,computeHistogram,area_power){return(
class Quad {
  constructor(x, y, w, h) {
    const [r, g, b, error] = colorFromHistogram(computeHistogram(x, y, w, h));
    this.x = x, this.y = y, this.w = w, this.h = h;
    this.color = `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).substring(1)}`;
    this.score = error * Math.pow(w * h, area_power);
  }
  split() {
    const dx = this.w / 2, x1 = this.x, x2 = this.x + dx;
    const dy = this.h / 2, y1 = this.y, y2 = this.y + dy;
    return [
      new Quad(x1, y1, dx, dy),
      new Quad(x2, y1, dx, dy),
      new Quad(x1, y2, dx, dy),
      new Quad(x2, y2, dx, dy)
    ];
  }
}
)});
  main.variable(observer("computeHistogram")).define("computeHistogram", ["imageContext"], function(imageContext){return(
function computeHistogram(x, y, w, h) {
  const {data} = imageContext.getImageData(x, y, w, h);
  const histogram = new Uint32Array(1024);
  for (let i = 0, n = data.length; i < n; i += 4) {
    ++histogram[0 * 256 + data[i + 0]];
    ++histogram[1 * 256 + data[i + 1]];
    ++histogram[2 * 256 + data[i + 2]];
    ++histogram[3 * 256 + data[i + 3]];
  }
  return histogram;
}
)});
  main.variable(observer("weightedAverage")).define("weightedAverage", function(){return(
function weightedAverage(histogram) {
  let total = 0;
  let value = 0;
  for (let i = 0; i < 256; ++i) total += histogram[i], value += histogram[i] * i;
  value /= total;
  let error = 0;
  for (let i = 0; i < 256; ++i) error += (value - i) ** 2 * histogram[i];
  return [value, Math.sqrt(error / total)];
}
)});
  main.variable(observer("colorFromHistogram")).define("colorFromHistogram", ["weightedAverage"], function(weightedAverage){return(
function colorFromHistogram(histogram) {
  const [r, re] = weightedAverage(histogram.subarray(0, 256));
  const [g, ge] = weightedAverage(histogram.subarray(256, 512));
  const [b, be] = weightedAverage(histogram.subarray(512, 768));
  return [
    Math.round(r), 
    Math.round(g), 
    Math.round(b), 
    re * 0.2989 + ge * 0.5870 + be * 0.1140
  ];
}
)});
  main.variable(observer("imageContext")).define("imageContext", ["FileAttachment","DOM","width"], function(FileAttachment,DOM,width){return(
FileAttachment("owl.jpg").image().then(image => {
  const context = DOM.context2d(width, width, 1);
  context.drawImage(image, 0, 0, width, width);
  return context;
})
)});
  main.variable(observer("TinyQueue")).define("TinyQueue", ["require"], function(require){return(
require("tinyqueue@2")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-interpolate@1", "d3-ease@1")
)});
  return main;
}
