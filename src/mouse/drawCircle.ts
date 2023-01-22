import { mouse, straightTo, Button, screen } from "@nut-tree/nut-js";

export async function drawCircle(r: number) {
  const position = await mouse.getPosition();  
  let {x, y} =  position;
  const screenWidth = await screen.width();
  const screenHeight = await screen.height();
  if(x < 2 * r + 20) {x = 2 * r + 20}
  if(y - r < 1) {y = r + 20}
  if(y + r > screenHeight + 10) {y = screenHeight - r - 10}
  await mouse.setPosition({x, y});
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
