export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    createNote= async (req, res) => {
        const data= req.body;
        if(req.file) data.imageurl='/uploads/' + req.file.filename;
        data.userId= 'user_123'; // TODO: luego obtener el usuario de la sesion o token
        try{
            const note = await this.noteService.createNote(data);
            res.status(201).json(note); // 201 Created
        }catch(error){
            res.status(400).json({error: 'Error al crear la nota'});
        }
    }
    getNotesByUserId= async (req, res) => {
        const userId= 'user_123';   
        try{
            const notes = await this.noteService.getNotesByUserId(userId);
            res.status(200).json(notes);// 200 OK
        }catch(error){
            res.status(400).json({error: 'Error al obtener las notas'});
        }
    }   
}