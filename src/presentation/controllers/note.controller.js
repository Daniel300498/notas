export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
        const data = req.body;
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
        data.userId = req.user.id;  //TODO:  LUEGO OBTENER EL USUARIO DE LA SESION O TOKEN
       // console.log("USER:", req.user);
        try {
            const note = await this.noteService.createNote(data);
            res.status(201).json(note); // 201 Created
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    getNotesByUserId = async (req, res) => {
        const userId = req.user.id;
        try {
            const notes = await this.noteService.getNotesByUserId(userId);
            res.status(200).json(notes); // 200 OK
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    getByIdNote = async (req, res) => {
        try {
            const {id} = req.params;
            const userId = req.user.id;
            const note = await this.noteService.getByIdNote(id, userId);
            if (!note) {
                return res.status(404).json({ error: 'Nota no encontrada' });
            }
            res.json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    updateNote = async (req, res) => {
    
            const {id} = req.params;
            const data = req.body;
            if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
            try {
                const note = await this.noteService.updateNote(id, data);
                res.status(200).json(note); 
            }catch (error) {
                res.status(400).json({ error: error.message });
            }
    }
    deleteNote = async (req, res) => {
        
            const { id } = req.params;
            try{
            const result = await  this.noteService.deleteNote(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}