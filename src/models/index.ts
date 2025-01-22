import { Sequelize } from "sequelize";
import sequelize from "../config/db.config.js";
import { User} from "./user.model.js";
import {UserRole} from "./user-role.model.js";
import { Role} from "./role.model.js";
import {RefreshToken} from "./refresh-token.model.js";
import { Document} from "./document.model.js";
import { DocumentUser } from "./document-user.model.js";



sequelize.addModels([ 
    User,
    UserRole,
    Role,
    RefreshToken,
    Document,
    DocumentUser
])

const db = {
    
    User,
    UserRole,
    Role,
    RefreshToken,
    Document,
    DocumentUser,
    Sequelize,
    sequelize,
}

export default db;
