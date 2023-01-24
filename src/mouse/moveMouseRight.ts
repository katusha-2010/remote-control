import { right, mouse} from "@nut-tree/nut-js";

export async function moveMouseRight(sideSize:number){
  await mouse.move(right(sideSize));
}
