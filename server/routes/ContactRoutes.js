import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { searchContacts, getAllContacts, getContactsForDMList } from "../controllers/ContactsController.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);
contactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);
contactsRoutes.get("/get-all-contacts",verifyToken,getAllContacts);

export default contactsRoutes;