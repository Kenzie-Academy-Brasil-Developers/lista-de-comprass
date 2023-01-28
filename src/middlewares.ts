import { IPurchaseListRequiredKeys, IdataRequiredKeys } from "./interfaces";
import { NextFunction, Request, Response } from "express";
import { database } from "./database";
export const validatedBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keys: Array<string> = Object.keys(req.body);
  const requiredKeys: Array<IPurchaseListRequiredKeys> = ["data", "listName"];
  const dataKeys: Array<IdataRequiredKeys> = ["name", "quantity"];

  let validatedKeys: boolean = requiredKeys.every((key: string) =>
    keys.includes(key)
  );

  if (req.method === "PATCH") {
    validatedKeys = requiredKeys.some((key: string) => keys.includes(key));
    req.body = { ...database[req.findListId], ...req.body };
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
) => {
  const { id } = req.params;

  const findId = database.findIndex((elem) => elem.id === Number(id));

  if (findId === -1) {
    return res.status(404).json({ message: "id not found" });
  }

  req.findListId = findId;

  next();
};

export const itemNameExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { itemName } = req.params;

  const findItemName = database.find((elem) => elem.data.name === itemName);

  if (!findItemName) {
    return res.status(404).json({ message: "item not found" });
  }
  next();
};
export const ensureIdAndItemName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, itemName } = req.params;

  const findId = database.findIndex((elem) => elem.id === Number(id));
  const findItem = database.forEach((elem) => elem.data.name === itemName);

  if (findId === -1) {
    return res.status(404).json({ message: "id not found" });
  }

  req.findListId = findId;

  next();
};
