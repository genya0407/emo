// utilities
const $ = (q) => document.querySelector(q)
const $$ = (q) => Array.from(document.querySelectorAll(q))
const mod = (a, b) => ((a % b) + b) % b;

// Paint functions
const moveX = (pt, dx) => ({ ...pt, x: pt.x + dx })
const moveY = (pt, dy) => ({ ...pt, y: pt.y + dy })
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
const polyNum = 2
const speedCoeff = 1 / 300
let frame = 0
setInterval(() => {
  clear(main)

  const topCenter = { x: 300, y: 100 }
  const bottomCenter = { x: 300, y: 600 - 100 }
  for (let i = 0; i < polyNum; i = i + 1) {
    // Outer
    const outerEllipseTopPt = ellipsePt(topCenter, 200, frame * speedCoeff, 2 * Math.PI * (i / polyNum))
    const outerEllipseBottomPt = ellipsePt(bottomCenter, 200, frame * speedCoeff, 2 * Math.PI * (i / polyNum))
    drawLine(main, outerEllipseTopPt, outerEllipseBottomPt)

    // cross line
    const nextOuterEllipseTopPt = ellipsePt(topCenter, 200, frame * speedCoeff, 2 * Math.PI * (i + 1 / polyNum))
    const nextOuterEllipseBottomPt = ellipsePt(bottomCenter, 200, frame * speedCoeff, 2 * Math.PI * (i + 1 / polyNum))
    drawLine(main, moveY(outerEllipseTopPt, 100), moveY(nextOuterEllipseTopPt, 100))
    drawLine(main, moveY(outerEllipseBottomPt, -100), moveY(nextOuterEllipseBottomPt, -100))

    // Inner
    const innerEllipseTopPt = ellipsePt(topCenter, 100, frame * speedCoeff * 5, 2 * Math.PI * (i / polyNum))
    const innerEllipseBottomPt = ellipsePt(bottomCenter, 100, frame * speedCoeff * 5, 2 * Math.PI * (i / polyNum))
    drawLine(main, moveY(innerEllipseTopPt, 150), moveY(innerEllipseBottomPt, -150))

    // cross line
    const nextInnerEllipseTopPt = ellipsePt(topCenter, 100, frame * speedCoeff * 5, 2 * Math.PI * (i + 1 / polyNum))
    const nextInnerEllipseBottomPt = ellipsePt(bottomCenter, 100, frame * speedCoeff * 5, 2 * Math.PI * (i + 1 / polyNum))
    drawLine(main, moveY(innerEllipseTopPt, 150), moveY(nextInnerEllipseTopPt, 150))
    drawLine(main, moveY(innerEllipseBottomPt, -150), moveY(nextInnerEllipseBottomPt, -150))
  }

  frame += 1;
}, interval)
