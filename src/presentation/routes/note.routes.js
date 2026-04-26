import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import upload from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";


import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js";
import MailService from "../../infrastructure/services/mail.service.js";

// inyección de dependencias
const mailService = new MailService();
const noteRepository = new NoteMongoRepository(); 
const noteService = new NoteService(noteRepository, mailService);
const noteController = new NoteController(noteService);

const router = Router();

router.post("/", authMiddleware, upload.single('image'), noteController.createNote);
router.get("/", authMiddleware, noteController.getNotesByUserId);
router.put("/:id", authMiddleware, upload.single('image'), noteController.updateNote);
router.delete("/:id", authMiddleware, noteController.deleteNote);
router.post("/:id/share", authMiddleware, noteController.shareNote);

export default router;