import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catch-async.js";
import { documentService } from "../services/document.service.js";
import { validationResult } from "express-validator";
import { Document } from "../models/document.model.js";


class DocumentController{

    public getOne = catchAsyncErrors( async ( req:Request, res:Response, next:NextFunction)=>{

        if(!req.user){
            return res.sendStatus(403);
        }

        const docId = req.params.id;
        const userId = req.user.id ;

        //find document in Document and DocumentUser Model
        const findDoc = await documentService.findDocumentById( docId, userId);

        if(findDoc==null){
            return res.sendStatus(404);
        }

        res.status(200).json({
            success:true,
            document: findDoc
        });

    })

    public getAll = catchAsyncErrors( async( req:Request, res:Response, next:NextFunction)=>{

        if(!req.user){
            return res.sendStatus(403);
        }

        const findAllDocs = await documentService.findAllDocuments( parseInt(req.user.id) );

        if(findAllDocs==null){
            return res.sendStatus(404);
        }

        res.status(200).json({
            success:true,
            documents: findAllDocs
        });


    })

    public updateDocument = catchAsyncErrors( async( req:Request, res:Response, next:NextFunction)=>{

        if(!req.user){
            return res.sendStatus(403);
        }

        const err = validationResult(req);

        if(!err.isEmpty()){
            return res.status(404).json(err);
        }



        const userId = req.user.id;
        const docId = req.params.id;
        const { title, content, isPublic} = req.body;


        //find document in Document and DocumentUser Model
        const findDoc = await documentService.findDocumentById( docId, userId);

        if(!findDoc){
            return res.sendStatus(404);
        }

        //update title
        if( title!=undefined && title!=null){  findDoc.title = title; }
        //update content
        if( content!=undefined && content!=null){  findDoc.content = content; }
        //update isPublic
        if( isPublic!=undefined && isPublic!=null){  findDoc.isPublic = isPublic; }


        //update the document
        await findDoc.save();

        return res.sendStatus(200);

    })

    public createDocument = catchAsyncErrors( async( req:Request, res:Response, next:NextFunction) =>{

        if(!req.user){
            return res.sendStatus(403);
        }

        const { title, content, isPublic} = req.body;
        const userId = req.user.id;

        const document = await Document.create({
            title,
            content,
            isPublic,
            userId
        })

        res.status(200).json({
            success:true,
            document
        })

    });

    public deleteDocument = catchAsyncErrors( async( req:Request, res:Response, next:NextFunction) =>{

        if(!req.user){
            return res.sendStatus(403);
        }

        const documentId = req.params.id;

        try{
            await Document.destroy({
              where:{
                  id: documentId,
                  userId: req.user.id
              }
            })

            return res.sendStatus(200);
        }
        catch(err){
            return res.sendStatus(403);
        }
        

    });



}

const documentController = new DocumentController();

export { documentController};