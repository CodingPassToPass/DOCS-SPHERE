import { Op } from "sequelize";
import { Document } from "../models/document.model.js";
import { DocumentUser } from "../models/document-user.model.js";



class DocumentService{

    public findDocumentById = async ( docId:string, userId:string) =>{

        //find document with user id ( Document Model)

        let findDoc = await Document.findOne({
            
            where:{
                [Op.or]:[
                    { 
                        id: docId,
                        userId: userId
                    },
                    { 
                        id: docId,
                        isPublic: true,
                    }
                ]
            }
        })

        //if document is not find in Document Model for user Id then , check shared document in Document User  ( DocumentUser Model)
        if(!findDoc){

            const sharedDocuments = await DocumentUser.findOne({
                where:{
                    documentId: docId,
                    userId
                },
                include:{
                    model: Document
                }
            })

            if(!sharedDocuments){
                return null; 
            }

            findDoc = sharedDocuments.document;
        }

        return findDoc;
          

    }


    public findAllDocuments = async ( userId:number) => {
        
        //find all docs by user id ( Document Model) 
        let findAllDocs = await Document.findAll({
            where:{
                userId,
            }
        });



        //find all docs by user id ( DocumentUser Model)
        const sharedDocuments = await DocumentUser.findAll({
            where:{
                userId
            },
            include:{
                model: Document
            }
        })

            //convert documentModel array of sharedDocuments to Document array
            const mapSharedDocuments = sharedDocuments.map((sharedDocument)=>{
                return sharedDocument.document;
            })
        
    

        //combine Document and SharedDocuments
        findAllDocs = [ ...findAllDocs, ...mapSharedDocuments];



        //if documents array is empty
        if(findAllDocs.length<1){
            return null;
        }

        return findAllDocs;


    }

}

const documentService = new DocumentService();

export { documentService};
