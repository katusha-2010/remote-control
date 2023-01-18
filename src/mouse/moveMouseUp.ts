import { mouse,up } from "@nut-tree/nut-js";

export async function moveMouseUp(sideSize:number){
  await mouse.move(up(sideSize));
}
