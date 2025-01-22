
import { Column, Table, PrimaryKey, BelongsTo, ForeignKey, Model, DataType } from "sequelize-typescript";
import { User} from "./user.model.js";
import { Role} from "./role.model.js";

@Table({ tableName:"user_role", underscored:true})

class UserRole extends Model{

    // @BelongsTo(()=> User)
    // user !: User;

    @ForeignKey(()=> User)
    @PrimaryKey
    @Column
    userId !: number;

    //it is important for taking roles model data
    @BelongsTo(()=> Role)
    role!: Role;

    @ForeignKey(()=> Role)
    @PrimaryKey
    @Column
    roleId!: number;

}


export { UserRole } ;























