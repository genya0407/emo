// utilities
const $ = (q) => document.querySelector(q)
const $$ = (q) => Array.from(document.querySelectorAll(q))
const mod = (a, b) => ((a % b) + b) % b;

// Paint functions
const distance = (pt1, pt2) => Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2);
const drawLine = (target, pt1, pt2) => {
  const line = document.createElement("div")
  line.style = `
        position: absolute;
        left: ${pt1.x}px;
        top: ${pt1.y}px;
        height: 0px;
        width: ${distance(pt1, pt2)}px;
        border: solid 0.5px;
        margin: 0px;
        padding: 0px;
        transform-origin: left top;
        transform: rotate(${Math.atan2(pt2.y - pt1.y, pt2.x - pt1.x)}rad);
      `
  target.appendChild(line)
};
const ellipsePt = (center, r, t, offset = 0, ellipseCoeff = 0.5) => {
  const dx = r * Math.cos(2 * Math.PI * t + offset)
  const dy = ellipseCoeff * r * Math.sin(2 * Math.PI * t + offset)
  return { x: center.x + dx, y: center.y + dy }
}
const clear = (target) => {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
}

// main logics
const main = $('#main')
main.style = `
      position: relative;
      width: 600px;
      height: 600px;
      border: dotted 1px;
      margin: auto;
    `

const fps = 30
const interval = 1000 / fps
const polyNum = 30
const speedCoeff = 1 / 300
let frame = 0
setInterval(() => {
  clear(main)

  const topPt = { x: 300, y: 100 }
  const bottomPt = { x: 300, y: 600 - 100 }
  for (let i = 0; i < polyNum; i = i + 1) {
    const onEllipsePt1 = ellipsePt({ x: 300, y: 220 }, 200, frame * speedCoeff, 2 * Math.PI * (mod(i + 1, polyNum) / polyNum))
    const onEllipsePt2 = ellipsePt({ x: 300, y: 220 }, 200, frame * speedCoeff, 2 * Math.PI * (i / polyNum))
    drawLine(main, onEllipsePt1, onEllipsePt2)
    drawLine(main, topPt, onEllipsePt1)
    drawLine(main, topPt, bottomPt)
    // drawLine(main, bottomPt, onEllipsePt1)
  }

  frame += 1;
}, interval)
