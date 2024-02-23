import { Router } from "express";
import { getTweetController,createTweetController, updateTweetController, deleteTweetController } from "../controllers/tweet.controller";

const tweetRouter = Router();


//define route paths

 tweetRouter.get("/:tweetId", getTweetController)
//tweetRouter.get("/", getAllTweetController)
 tweetRouter.post("/",createTweetController)
 tweetRouter.delete("/:userId",deleteTweetController)
 tweetRouter.put("/",updateTweetController)

export default tweetRouter