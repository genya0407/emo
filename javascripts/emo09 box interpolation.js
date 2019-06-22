// utilities
const $ = (q) => document.querySelector(q)
const $$ = (q) => Array.from(document.querySelectorAll(q))
const mod = (a, b) => ((a % b) + b) % b;

// Paint functions
const moveX = (pt, dx) => ({ ...pt, x: pt.x + dx })
const moveY = (pt, dy) => ({ ...pt, y: pt.y + dy })
const middlePt = (pt1, pt2) => ({ x: (pt1.x + pt2.x) / 2, y: (pt1.y + pt2.y) / 2 })
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
const ellipsePt = (center, radius, theta, ellipseCoeff = 0.5) => {
  const dx = radius * Math.cos(theta)
  const dy = ellipseCoeff * radius * Math.sin(theta)
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
const onionNum = 10
const targetTheta = Math.PI
const theta = Array.from(Array(onionNum)).fill(0)
const epsilon = Math.PI / 9
setInterval(() => {
  clear(main)

  for (let onionIndex = 0; onionIndex < onionNum; onionIndex = onionIndex + 1) {
    const onionRatio = (onionIndex / onionNum)
    const topCenter = { x: 300, y: 300 + onionRatio * 200 }
    const bottomCenter = { x: 300, y: 300 - onionRatio * 200 }
    const radius = onionRatio * 300

    const leftTop = ellipsePt(topCenter, radius, theta[onionIndex])
    const rightTop = ellipsePt(topCenter, radius, theta[onionIndex] + Math.PI)
    const leftBottom = ellipsePt(bottomCenter, radius, theta[onionIndex])
    const rightBottom = ellipsePt(bottomCenter, radius, theta[onionIndex] + Math.PI)

    drawLine(main, leftTop, rightTop)
    drawLine(main, rightTop, rightBottom)
    drawLine(main, rightBottom, leftBottom)
    drawLine(main, leftBottom, leftTop)

    const t = (onionRatio + 0.3) * 0.08
    theta[onionIndex] = (1 - t) * theta[onionIndex] + t * targetTheta
  }

  if (!theta.some(the => Math.abs(the - targetTheta) > epsilon)) {
    for (let onionIndex = 0; onionIndex < onionNum; onionIndex = onionIndex + 1) {
      theta[onionIndex] = 0
    }
  }
}, interval)
