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

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Crear una nueva nota
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Nota creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", authMiddleware, upload.single('image'), noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Obtener todas las notas del usuario autenticado
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, noteController.getNotesByUserId);

/**
 * @swagger
 * /notes/{id}/public:
 *   get:
 *     summary: Obtener una nota pública sin autenticación
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nota pública encontrada
 *       403:
 *         description: La nota es privada
 *       404:
 *         description: Nota no encontrada
 */
router.get("/:id/public", noteController.getPublicNote);
/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Obtener una nota por ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nota encontrada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Nota no encontrada
 */
//router.get("/:id", authMiddleware, noteController.getNoteById);
router.get("/:id", authMiddleware, noteController.getByIdNote);
/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Actualizar una nota existente
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Nota actualizada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Nota no encontrada
 */
router.put("/:id", authMiddleware, upload.single('image'), noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Eliminar una nota (Solo Admins)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Nota eliminada correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Nota no encontrada
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), noteController.deleteNote);

/**
 * @swagger
 * /notes/{id}/share:
 *   post:
 *     summary: Compartir una nota por email
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email enviado exitosamente
 *       400:
 *         description: Error al enviar
 *       401:
 *         description: No autorizado
 */
router.post("/:id/share", authMiddleware, noteController.shareNote);

export default router;