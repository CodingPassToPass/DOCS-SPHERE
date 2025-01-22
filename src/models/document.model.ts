import { BelongsTo, Column, DataType, Default, ForeignKey, Table, HasMany, BelongsToMany, Model, DefaultScope } from "sequelize-typescript";
import { User} from "./user.model.js";
import { DocumentUser } from "./document-user.model.js";


@DefaultScope(()=> ({ 
    include: [
        {
            model: DocumentUser,
            include:[
                {
                    model: User,
                    attributes: ["email"],

                }
            ]
        }
    ]
}))

@Table({ timestamps: true, tableName: "document", underscored:true})

class Document extends Model{

    @Column(DataType.STRING)
    title !: string;

    @Column({
        type: DataType.JSONB
    })
    content !: string;

    @ForeignKey(()=> User)
    @Column
    userId !: number
    
    // @BelongsTo(()=> User)
    // user !: User;

    @BelongsToMany(()=> User, {
        through: {
            model: ()=> DocumentUser,
        }
    })
    documents!: Array<User>


    @HasMany(()=> DocumentUser,{
        onDelete:'CASCADE',
    })
    documentUsers!: Array<DocumentUser>

    @Default(false)
    @Column(DataType.BOOLEAN)
    isPublic !: boolean


}


export { Document};










