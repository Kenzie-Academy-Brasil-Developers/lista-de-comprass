import { itemNameExists } from "./middlewares";
import express, { Request, response, Response } from "express";
import { database, ids } from "./database";
import { Ilist, IListRequest } from "./interfaces";

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

export const listPurchaseById = ({ findListId }: Request, res: Response) => {
  return res.status(200).json(database[findListId]);
};

export const updateList = (
  { validatedBody, findListId }: Request,
  res: Response
) => {
  database[findListId] = { ...database[findListId], ...validatedBody };

  return res.status(200).json(database[findListId]);
};

export const deleteList = ({ findListId }: Request, res: Response) => {
  database.splice(findListId, 1);

  return res.status(204).json();
};

export const deleteItemName = (
  { findListId, itemNameExists }: Request,
  res: Response
) => {
  database.splice(findListId, 1);

  return res.status(204).json();
};
