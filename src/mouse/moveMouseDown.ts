import { down, mouse,up } from "@nut-tree/nut-js";

export async function moveMouseDown(sideSize:number){
  await mouse.move(down(sideSize));
}
