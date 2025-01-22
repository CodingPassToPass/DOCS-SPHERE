import catchAsyncErrors from "../middleware/catch-async.js";
import { documentService } from "../services/document.service.js";
import { validationResult } from "express-validator";
class DocumentController {
    constructor() {
        this.getOne = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(403);
            }
            const docId = req.params.id;
            const userId = req.user.id;
            //find document in Document and DocumentUser Model
            const findDoc = await documentService.findDocumentById(docId, userId);
            if (findDoc == null) {
                return res.sendStatus(404);
            }
            res.status(200).json({
                success: true,
                document: findDoc
            });
        });
        this.getAll = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(403);
            }
            const findAllDocs = await documentService.findAllDocuments(parseInt(req.user.id));
            if (findAllDocs == null) {
                return res.sendStatus(404);
            }
            res.status(200).json({
                success: true,
                documents: findAllDocs
            });
        });
        this.updateDocument = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(403);
            }
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(404).json(err);
            }
            const userId = req.user.id;
            const docId = req.params.id;
            const { title, content, isPublic } = req.body;
            //find document in Document and DocumentUser Model
            const findDoc = await documentService.findDocumentById(docId, userId);
            if (!findDoc) {
                return res.sendStatus(404);
            }
            //update title
            if (title != undefined && title != null) {
                findDoc.title = title;
            }
            //update content
            if (content != undefined && content != null) {
                findDoc.content = content;
            }
            //update isPublic
            if (isPublic != undefined && isPublic != null) {
                findDoc.isPublic = isPublic;
            }
            //update the document
            await findDoc.save();
            return res.sendStatus(200);
        });
    }
}
const documentController = new DocumentController();
export { documentController };
