import express from "express"
import { getStats } from "../db/queries/stats.js"
const statsRouter = express.Router()
export default statsRouter

statsRouter.route('/').get(async(req, res)=>{
    const stats = await getStats()
    res.status(200).send(stats)
})