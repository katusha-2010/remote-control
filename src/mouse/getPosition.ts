import { mouse } from "@nut-tree/nut-js";

export async function mousePosition(){
  const position = await mouse.getPosition();  
  return position;
}
