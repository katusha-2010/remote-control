import { httpServer } from "./src/http_server/index";
import { createWebSocketStream, WebSocketServer } from "ws";
import { drawSquare } from "./src/mouse/drawSquare";
import { drawRectangle } from "./src/mouse/drawRectangle";
import { drawCircle } from "./src/mouse/drawCircle";
import { moveMouseUp } from './src/mouse/moveMouseUp';
import { moveMouseDown } from './src/mouse/moveMouseDown';
import { moveMouseLeft } from './src/mouse/moveMouseLeft';
import { moveMouseRight } from './src/mouse/moveMouseRight';
import { mousePosition } from "./src/mouse/getPosition";
import { doPrintScreen } from "./src/mouse/doPrintScreen";

const HTTP_PORT:number = 8181;
const WEBSOCKET_PORT:number = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

wss.on("connection", function connection(ws) {

  console.log(`Start websocket server on the ${WEBSOCKET_PORT} port!`);  
  const stream = createWebSocketStream(ws, {decodeStrings:false});

  stream.on("data", async function message(data) {
    try {  
    const commandArr = data.toString().split(' ');
    const [command, widthFigure, heightFigure] = commandArr;
    let mouseCoordinate = {x:0, y:0};

    switch (command) {
      case 'draw_square':
        await drawSquare(+widthFigure); 
        stream.write(`${command}\t${+widthFigure}`)        
        break;
      case 'draw_circle':
        await drawCircle(+widthFigure); 
        stream.write(`${command}\t${+widthFigure}`)       
        break;
      case 'draw_rectangle':
        await drawRectangle(+widthFigure, +heightFigure);
        stream.write(`${command}\t${+widthFigure}\t${+heightFigure}`)        
        break; 
      case 'mouse_up':
        await moveMouseUp(+widthFigure);  
        stream.write(`${command}\t${+widthFigure}`)      
        break;
      case 'mouse_down':
        await moveMouseDown(+widthFigure);
        stream.write(`${command}\t${+widthFigure}`)       
        break;
      case 'mouse_left':
        await moveMouseLeft(+widthFigure);
        stream.write(`${command}\t${+widthFigure}`)        
        break;
      case 'mouse_right':
        await moveMouseRight(+widthFigure);
        stream.write(`${command}\t${+widthFigure}`)        
        break;
      case 'mouse_position':
        mouseCoordinate = await mousePosition();
        stream.write(`${command} ${mouseCoordinate.x},${mouseCoordinate.y}`)               
        break;
      case 'prnt_scrn':
        const bufferPhoto = await doPrintScreen();
        stream.write(`${command} ${bufferPhoto}`)                         
        break; 
      default:
        break;
    }

    let consoleResult:string;
    switch (command) {
      case 'prnt_scrn':
        consoleResult = '';
        break;
      case 'mouse_position':
        consoleResult = `${mouseCoordinate.x},${mouseCoordinate.y}`;
        break;
      case 'draw_rectangle':
        consoleResult = `${+widthFigure} ${+heightFigure}`;
        break;    
      default:
        consoleResult = `${+widthFigure}`;
        break;
    }

    console.log(`Command: ${command}\nResult:${command} ${consoleResult}`);

    } catch  {
      console.log("Smth went wrong");
    } 
  });
}); 

process.on('SIGINT', function() {
    wss.close();
    console.log('Соединение закрыто');
    process.exit();
})
