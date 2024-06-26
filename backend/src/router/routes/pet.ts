import {Router, Request, Response} from "express";

import Pet from "../../models/pet"


const router = Router();

// Get all pets
router.get('/', async (req: Request, res: Response) => {
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


router.get('/search/:owner', async (req: Request, res: Response) => {
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
router.get('/search', async (req: Request, res: Response) => {

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