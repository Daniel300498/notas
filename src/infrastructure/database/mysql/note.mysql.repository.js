import NoteModel from './note.model.js';
export default class NoteMySQLRepository {
    async save(noteEntity){
        const note = await NoteModel.create({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userid: noteEntity.userid
        });
        return note.toJSON();
    }
    async findByUserId(userid){
        return await NoteModel.findAll({where: {userid}});
    }
}