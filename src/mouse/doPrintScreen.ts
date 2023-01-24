import Jimp from 'jimp';
import { screen, imageResource, Region } from "@nut-tree/nut-js";
import { mousePosition } from './getPosition';
import fs from 'fs'

export async function doPrintScreen(){
  const mouseCoordinate = await mousePosition();
  const coordinateX = mouseCoordinate.x - 100;
  const coordinateY = mouseCoordinate.y - 100;
  const highlightRegion = new Region(coordinateX, coordinateY, 200, 200);   
  const screenRegion = await screen.grabRegion(highlightRegion);
  const rgbImg = await screenRegion.toRGB();
  const jimpObject = new Jimp(rgbImg);
  return (await jimpObject.getBufferAsync(Jimp.MIME_PNG)).toString('base64');
}
