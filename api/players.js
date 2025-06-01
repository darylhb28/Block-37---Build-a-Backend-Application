import express from "express"
import { getPlayers } from "../db/queries/players.js"
const playersRouter = express.Router()
export default playersRouter

playersRouter.route('/').get(async(req, res)=>{
   const players = await getPlayers()
   res.status(200).send(players)
})
