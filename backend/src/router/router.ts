import {Router, Request, Response} from "express";
import userSchema from "../models/user"

const router = Router();

router.get('/test', (req: Request, res: Response) => {
    //  Make a call to the database

    res.json({
        ok: true,
        // items
        message: "The Request was successfull yes"
    })
});


router.get('test/:id', (req: Request, res: Response) =>{
    const id = req.params.id

    if (!id){
        res.status(400).json({
            ok: false,
            message: "No id included"
        })
    }

    // Make a call to the database

    res.json({
        ok: true,
        // items
    })
})

export default router