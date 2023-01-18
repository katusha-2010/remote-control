import { left, mouse} from "@nut-tree/nut-js";

export async function moveMouseLeft(sideSize:number){
  await mouse.move(left(sideSize));
}
