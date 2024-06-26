import {Router, Request, Response} from "express";
import MySQL from '../databases/mysql'

import userSchema from "../models/user"

const router = Router();

// Get all users
router.get('/users', (req: Request, res: Response) => {
    const query = `SELECT * FROM user`;
    //  Make a call to the database
    MySQL.executeQuery(query, (err: Error, users: Object[]) =>{
        if (err){
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            users
        });
    });
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