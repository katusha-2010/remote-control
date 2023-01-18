import { mouse, straightTo, Button } from "@nut-tree/nut-js";

export async function drawCircle(r: number) {
  const position = await mouse.getPosition();  
  const {x, y} =  position;
  const x0 = x - r;
  const y0 = y;
  await mouse.pressButton(Button.LEFT);
  for(let i = 0; i < 360; i++) {
  const x1 = x0 + r * Math.cos(i * Math.PI/180);
  const y1 = y0 + r * Math.sin(i * Math.PI/180);
  await mouse.move(straightTo({x:x1, y:y1}));
  await mouse.setPosition({x:x1, y:y1})
  }
  await mouse.releaseButton(Button.LEFT);
}
