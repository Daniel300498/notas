export default class NoteEntity {
    constructor ({id, title, content, imageUrl,isPrivate, passwword, userid}){
        this.id= id;
        this.title= title;
        this.content= content;
        this.imageUrl= imageUrl || null;
        this.isPrivate= isPrivate || false;
        this.passwword= passwword || null;
        this.userid= userid;
    }
}
