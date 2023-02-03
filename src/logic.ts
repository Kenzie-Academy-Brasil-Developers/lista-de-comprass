import { Request, Response } from "express";
import { database } from "./database";
import { Ilist } from "./interfaces";

export const createPurchaseList = (
  { validatedBody }: Request,
  res: Response
): Response => {
  const createList: Ilist = {
    ...validatedBody,
    id: database.length + 1,
  };

  database.push(createList);

  return res.status(201).json(createList);
};

export const listPurchaseList = (req: Request, res: Response): Response => {
  return res.status(200).json(database);
};

export const listPurchaseById = ({ findListIndex }: Request, res: Response) => {
  return res.status(200).json(database[findListIndex]);
};

export const updateList = (req: Request, res: Response): Response => {
  const { findListIndex } = req;
  const { name, quantity } = req.body;
  const item = req.params.itemName;

  const findItem: number = database[findListIndex].data.findIndex(
    (elem) => elem.name === item
  );

  if (findItem === -1) {
    return res.status(404).json({
      message: "item not found",
    });
  }

  database[findListIndex].data[findItem] = {
    name,
    quantity,
  };

  return res.status(200).json(database[findListIndex]);
};

export const deleteList = ({ findListIndex }: Request, res: Response) => {
  database.splice(findListIndex, 1);

  return res.status(204).json();
};

export const deleteItemName = (req: Request, res: Response) => {
  const { findListIndex } = req;
  const item: string = req.params.itemName;

  const findItem: number = database[findListIndex].data.findIndex(
    (elem) => elem.name === item
  );
  if (findItem === -1) {
    return res.status(404).json({
      message: "item not found",
    });
  }

  database[findListIndex].data.splice(findItem, 1);

  return res.status(204).json();
};
