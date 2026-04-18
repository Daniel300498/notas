import { DataTypes} from "sequelize";
import sequelize from "./connection.js";

const noteModel = sequelize.define('Note',{
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    imageUrl: {type: DataTypes.STRING},
    isPrivate: {type: DataTypes.BOOLEAN, defaultValue: false},
    password: {type: DataTypes.STRING},
    userid: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: true
});
export default noteModel;
