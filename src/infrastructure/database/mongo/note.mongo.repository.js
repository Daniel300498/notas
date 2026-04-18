import NoteModel from './note.model.js';

export default class NoteMongoRepository {
    async save(noteEntity){
        const note= new NoteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userid: noteEntity.userid
        });
        const savedNote= await note.save();
        return savedNote.toObject();
    }
    async findById(userid){
       return await NoteModel.find({userid});
    }
}