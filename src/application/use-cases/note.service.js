// importante al trabajar con nuestros archivos debemos añadir al final .js requerido para ESM
import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }

    async createNote(data) {
        if (!data.title || !data.content) { throw new Error("Title and content are required"); }

        const note = new NoteEntity(data);
        return await this.noteRepository.save(note);
    }

    async getNotesByUserId(userId){
        return await this.noteRepository.findByUserId(userId);
    }

    async getByIdNote(id){
        const note = await this.noteRepository.findById(id);
        if(!note) throw new Error("Nota no encontrada");
        return note;
    }
    async updateNote(id, data){
        const note = await this.noteRepository.updateNote(id, data);
        if(!note) throw new Error("Nota no encontrada");
        return note;
    }

    async deleteNote(id){
        const note = await this.noteRepository.delete(id);
        if(!note) throw new Error("Nota no se pudo eliminar");
        return {message: "Nota Eliminada Satisfatoriamente"};
    }
}