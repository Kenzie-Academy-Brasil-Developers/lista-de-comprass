import { Idata } from "../../interfaces";
import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      validatedBody: {
        listName: string;
        data: Array<Idata>;
      };
      findListIndex: number;
      itemIndex: number;
    }
  }
}

export {};
