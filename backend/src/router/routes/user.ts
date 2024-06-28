import {Router, Request, Response} from "express";

import MySQL from '../../databases/mysql'


const router = Router();

// Get all users
router.get('/', (req: Request, res: Response) => {
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

//  Get user by id
router.get('/search/:id', (req: Request, res: Response) => {
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
            user: users[0]
        })
    });
})

// Get users by email prefix
router.get('/search', (req: Request, res: Response) => {

    const emailPrefix = req.query.emailPrefix as string;

    if (!emailPrefix) {
        return res.status(400).json({
            ok: false,
            error: 'Email prefix is required',
        });
    }

    const query = `SELECT * FROM user WHERE email LIKE  '${emailPrefix}%'`;

    MySQL.executeQuery(query, (err: string, users: Object[]) => {
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

export default router