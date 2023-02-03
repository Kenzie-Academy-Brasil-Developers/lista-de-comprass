import { IPurchaseListRequiredKeys, IdataRequiredKeys } from "./interfaces";
import { NextFunction, Request, Response } from "express";
import { database } from "./database";
export const validatedBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const keys: Array<string> = Object.keys(req.body);
  const requiredKeys: Array<IPurchaseListRequiredKeys> = ["data", "listName"];
  const dataKeys: Array<IdataRequiredKeys> = ["name", "quantity"];

  let validatedKeys: boolean = requiredKeys.every((key: string) =>
    keys.includes(key)
  );

  if (req.method === "PATCH") {
    validatedKeys = requiredKeys.some((key: string) => keys.includes(key));
    req.body = { ...database[req.findListIndex], ...req.body };
  }

  if (!validatedKeys) {
    return res.status(400).json({
      message: "invalid input",
    });
  }

  const { listName, data } = req.body;

  req.validatedBody = {
    listName,
    data,
  };

  next();
};

export const ensureIdExists = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { id } = req.params;

  const listIndex = database.findIndex((elem) => elem.id === Number(id));

  if (listIndex === -1) {
    return res.status(404).json({ message: "Purchase list not found" });
  }

  req.findListIndex = listIndex;

  next();
};
