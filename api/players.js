import express from "express"
import { createPlayer, deletePlayer, getPlayerById, getPlayers } from "../db/queries/players.js"
import { updateStatsByPlayerId } from "../db/queries/stats.js"
import { verifyToken } from "./auth.js"
const playersRouter = express.Router()
export default playersRouter

//GET (all)
playersRouter.route('/').get(async(req, res)=>{
   const players = await getPlayers()
   res.status(200).send(players)
})


//GET (by id)
playersRouter.route('/:id').get(async(req, res)=>{
    const id = Number(req.params.id)
    const foundPlayer = await getPlayerById(id)

    if (!foundPlayer){
        res.status(404).send("There is no player with that ID")
    }

    res.status(200).send(foundPlayer)
})

//POST (requires auth, requires "firstName" and "lastName" fields)
playersRouter.route('/').post( verifyToken, async(req,res)=>{
    if(!req.user){
        return res.status(404).send("Function only available to authorized users.")
    }
    if (!req.body){
        return res.status(400).send("Missing required fields.")
    }

    const {firstName, lastName} = req.body

    if (!firstName || !lastName){
        return res.status(400).send("Please include a first and last name for the player.")
    }

    const name = `${firstName} ${lastName}`

    const newPlayer = await createPlayer(name)
    res.status(200).json({
        message: "New Player Created",
        player: newPlayer
    })
})

//PUT (requires auth, updates a player's stats by their ID)
playersRouter.route("/:id/stats").put( verifyToken, async (req, res)=>{
    if (!req.user){
        return res.status(400).send("Function only available to authorized users.")
    }
    const id = Number(req.params.id)  
    const foundPlayer = await getPlayerById(id)

    if (!foundPlayer){
        return res.status(404).send("There is no player with that ID")
    }

    if (!req.body){
        return res.status(400).send("Missing request body.")
    }

    const {average, slugging, onbasepct} = req.body

    if (!average || !slugging || !onbasepct){
        return res.status(400).send("Please include updates to all stat categories (average, slugging, and onbasepct)")
    }

    const updatedStats = await updateStatsByPlayerId({id, average, slugging, onbasepct})
    res.status(200).send(updatedStats)

})

//DELETE (requires auth)
playersRouter.route("/:id").delete( verifyToken, async(req, res)=>{
    if (!req.user){
        return res.status(400).send("Function only available to authorized users.")
    }
    const id = Number(req.params.id)  
    const foundPlayer = await getPlayerById(id)

    if (!foundPlayer){
        return res.status(404).send("There is no player with that ID")
    }

    const result = await deletePlayer(id)
    res.status(200).send("Player Deleted")
})