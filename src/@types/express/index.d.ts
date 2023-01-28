import { Idata } from "../../interfaces";
import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      validatedBody: {
        listName: string;
        data: {
          name: string;
          quantity: string;
        };
      };
      findListId: number;
      itemNameExists: string;
    }
  }
}

export {};
