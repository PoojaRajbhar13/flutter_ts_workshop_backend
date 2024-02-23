import { Request, Response } from "express";
import { getUserRepo, createUserRepo, deleteUserRepo, updateUserRepo } from "../repositories/user.reposittory";
import { IUserInterface } from "../database/interfaces/user.interface";


export const getUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    console.log(userId)

    try {
        const user = await getUserRepo(userId)
        if (user) {
            res.status(200).json({ "data": user })
        } else {
            res.status(500).json({ "error": "User Not Found" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error });
    }
};

export const createUserController = async (req: Request, res: Response) => {
    const user: IUserInterface = req.body;

    try {
        const sucess = await createUserRepo(user)
        if (sucess) {
            res.status(200).json({ "data": user })
        } else {
            res.status(500).json({ "error": "User Not created" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error });
    }
};
export const updateUserController = async (req: Request, res: Response) => {
    const updateduser: IUserInterface = req.body;

    try {
        const sucess = await updateUserRepo(updateduser.uid,  updateduser)
        if (sucess) {
            res.status(200).json({ data: "User Updated" });
        } else {
            res.status(500).json({ error: "User Not Updated" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error });
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    try {
        const sucess = await deleteUserRepo(userId);
        if (sucess) {
            res.status(200).json({ data: "User Deleted" });
        } else {
            res.status(500).json({ error: "User Not Deleted" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error });
    }
};