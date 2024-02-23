import { Request, Response } from "express";
import { getTweetRepo, createTweetRepo, deleteTweetRepo, updateTweetRepo } from "../repositories/tweet.repository";
import { ITweetInterface } from "../database/interfaces/tweet.interface";

import { updateUserWithTweetIdRepo } from "../repositories/user.reposittory";

export const getTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;

    try {
        const tweet = await getTweetRepo(tweetId)
        if (tweet) {
            res.status(200).json({ "data": tweet })
        } else {
            res.status(500).json({ "error": "Tweet Not Found" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error });
    }
};

export const createTweetController = async (req: Request, res: Response) => {
    const tweet: ITweetInterface = req.body;

    try {
        const sucess = await createTweetRepo(tweet)
        if (sucess) {
            const userUpdateSucess = await updateUserWithTweetIdRepo(tweet.adminId, tweet.tweetId)
            if (userUpdateSucess) {
                res.status(200).json({ "data": tweet });
            }
            else {
                res.status(500).json({ "error": "User not Updated" });
            }
        } else {
            res.status(500).json({ "error": "Tweet Not created" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error });
    }
};
export const updateTweetController = async (req: Request, res: Response) => {
    const updatedtweet: ITweetInterface = req.body;
    console.log(updatedtweet)

    try {
        const sucess = await updateTweetRepo(updatedtweet.tweetId, updatedtweet)
        if (sucess) {
            res.status(200).json({ data: "Tweet Updated" });
        } else {
            res.status(500).json({ error: "Tweet Not Updated" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error });
    }
};

export const deleteTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;

    try {
        const sucess = await deleteTweetRepo(tweetId);
        if (sucess) {
            res.status(200).json({ data: "Tweet Deleted" });
        } else {
            res.status(500).json({ error: "Tweet Not Deleted" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error });
    }
};