import { FormEvent, FormEventHandler } from "react";

export const ws = new WebSocket('ws://localhost:9443');

export function setAnswer(value: {[key: string]: string}[]) {
  
  console.log('out', value, ws.OPEN, ws.readyState)
  if (ws.readyState === 1){
    console.log(value);
    ws.send(JSON.stringify((value)))
  }

  if(ws.readyState === 4) {
    ws.close()
  }
}
