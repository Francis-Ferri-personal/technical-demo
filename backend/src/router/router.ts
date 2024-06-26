import {Router, Request, Response} from "express";
import MySQL from '../databases/mysql'

import userSchema from "../models/user"

const router = Router();

// Get users by email prefix
router.get('/users', (req: Request, res: Response) => {

    const emailPrefix = req.query.emailPrefix as string;

    if (!emailPrefix) {
        return res.status(400).json({
            ok: false,
            error: 'Email prefix is required',
        });
    }

    const query = `SELECT * FROM user WHERE email LIKE  '${emailPrefix}%'`;

    MySQL.executeQuery(query, (err: Error, users: Object[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
        res.json({
            ok: true,
            users,
        });
    });
});

//  Get user by id
router.get('/users/:id', (req: Request, res: Response) => {
    // TODO: add validation to the email and to get just one 
    const id = req.params.id;
    
    const query = `SELECT * FROM user where id = ${id}`;

    MySQL.executeQuery(query, (err: Error, users: Object []) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            heroe: users[0]
        })
    });
})



export default router