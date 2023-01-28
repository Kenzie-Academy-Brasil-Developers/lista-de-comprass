import {
  ensureIdAndItemName,
  ensureIdExists,
  itemNameExists,
  validatedBodyMiddleware,
} from "./middlewares";
import {
  createPurchaseList,
  deleteItemName,
  deleteList,
  listPurchaseById,
  listPurchaseList,
  updateList,
} from "./logic";
import express, { Application } from "express";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", validatedBodyMiddleware, createPurchaseList);
app.get("/purchaseList", listPurchaseList);
app.get("/purchaseList/:id", ensureIdExists, listPurchaseById);
app.patch("/purchaseList/:id/:itemName", ensureIdAndItemName, updateList);
app.delete("/purchaseList/:id/:itemName", ensureIdAndItemName, deleteItemName);
app.delete("/purchaseList/:id", ensureIdExists, deleteList);

app.listen(3000, () => {
  console.log("Server is running!");
});
