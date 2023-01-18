import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";
import { drawSquare } from "./src/mouse/drawSquare";
import { drawRectangle } from "./src/mouse/drawRectangle";
import { drawCircle } from "./src/mouse/drawCircle";
import { moveMouseUp } from './src/mouse/moveMouseUp';
import { moveMouseDown } from './src/mouse/moveMouseDown';
import { moveMouseLeft } from './src/mouse/moveMouseLeft';
import { moveMouseRight } from './src/mouse/moveMouseRight';

const HTTP_PORT:number = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", async function message(data) {
    const commandArr = data.toString().split(' ');
    const [command, widthFigure, heightFigure] = commandArr;

    switch (command) {
      case 'draw_square':
        await drawSquare(+widthFigure);        
        break;
      case 'draw_circle':
        await drawCircle(+widthFigure);        
        break;
      case 'draw_rectangle':
        await drawRectangle(+widthFigure, +heightFigure);        
        break; 
      case 'mouse_up':
        await moveMouseUp(+widthFigure);        
        break;
      case 'mouse_down':
        await moveMouseDown(+widthFigure);        
        break;
      case 'mouse_left':
        await moveMouseLeft(+widthFigure);        
        break;
      case 'mouse_right':
        await moveMouseRight(+widthFigure);        
        break; 
      default:
        break;
    }
    heightFigure? ws.send(`${command}\t${+widthFigure}\t${+heightFigure}`): ws.send(`${command}\t${+widthFigure}`);
  });
});  


wss.on("close", ()=> console.log('Соединение закрыто'))

// document.addEventListener('keydown', function(event) {
//   if (event.code === 'ArrowRight') {
//     (async () => {  
//   await mouse.move([{x:10, y:10}]);

//   })();
//   }
// });

// import WebSocket from 'ws';

// const ws = new WebSocket.Server({ server: httpServer });

// ws.on('open', function open(wss) {
//   wss.send('something');
// });

// ws.on('message', function message(data) {
//   console.log('received: %s', data);
// });
