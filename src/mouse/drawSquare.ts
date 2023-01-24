import { Button, down, left, mouse, right, up } from "@nut-tree/nut-js";

export async function drawSquare(sideSize:number){
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(sideSize));
  await mouse.move(down(sideSize));
  await mouse.move(left(sideSize));
  await mouse.move(up(sideSize));
  await mouse.releaseButton(Button.LEFT);
}
