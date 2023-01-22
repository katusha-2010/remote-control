import Jimp from 'jimp';
import { screen, imageResource, Region } from "@nut-tree/nut-js";
import { mousePosition } from './getPosition';
import fs from 'fs'

export async function doPrintScreen(){
  const mouseCoordinate = await mousePosition();
  const coordinateX = mouseCoordinate.x - 100;
  const coordinateY = mouseCoordinate.y - 100;
  const highlightRegion = new Region(coordinateX, coordinateY, 200, 200);
  // await screen.highlight(highlightRegion);
  // await screen.captureRegion('photo', highlightRegion);
  // return Jimp.read('./photo.png')
  //   .then(image => image.getBufferAsync(Jimp.MIME_PNG))
  //   .then((el) => el.toString('base64'))   
  const screenRegion = await screen.grabRegion(highlightRegion);
  const rgbImg = await screenRegion.toRGB();
  console.log(rgbImg)
  const jimpObject = new Jimp(rgbImg);
    return Jimp.read(jimpObject)    
    .then(buffer => buffer.getBufferAsync(Jimp.MIME_PNG))
    .then((el) => el.toString('base64'))
}
