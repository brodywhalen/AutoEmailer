import { NextFunction, Request as Request2, Response as Response2 } from "express";

/* eslint-disable @typescript-eslint/no-unsafe-argument */
const info = (...params: (string | ReadableStream<Uint8Array> | null)[]) => {
    console.log(...params);
};


// const error = (...params:string[]) => {
//     console.error(...params);
// };

export const requestLogger = (request: Request2, _response: Response2, next: NextFunction) => {
    info('Method:', request.method);
    info('Path:  ', request.path);
    info('Body:  ', request.body);
    info('---');
    
    next();
  };