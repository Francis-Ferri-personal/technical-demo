import {Router, Request, Response} from "express";
import MySQL from '../databases/mysql'
import Pet from "../models/pet"


const router = Router();

//  MySQL

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

//  Get user by id
router.get('/users/search/:id', (req: Request, res: Response) => {
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

// Get users by email prefix
router.get('/users/search', (req: Request, res: Response) => {

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


//  MongoDB

// Get all pets
router.get('/pets', async (req: Request, res: Response) => {
    try {
        const pets = await Pet.find().exec();
        res.json({
            ok: true,
            pets,
        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err,
        });
    }
});


router.get('/pets/search/:owner', async (req: Request, res: Response) => {
    // populate: usuario, categoria
    const owner = req.params.owner;

    if (!owner) {
        return res.status(400).json({
            ok: false,
            error: 'Owner is required',
        });
    }

    try {
        const pets = await Pet.find({owner}).exec();
        res.status(200).json({
            ok: true,
            pets
        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err,
        });
    }
});

// Get users by email prefix
router.get('/pets/search', async (req: Request, res: Response) => {

    const namePrefix = req.query.namePrefix as string;

    if (!namePrefix) {
        return res.status(400).json({
            ok: false,
            error: 'Pet name prefix is required',
        });
    }

    const regex = new RegExp(namePrefix, 'i');

    try {
        const pets = await Pet.find({name: regex}).exec();
        res.status(200).json({
            ok: true,
            pets
        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err,
        });
    }
    
});

export default router