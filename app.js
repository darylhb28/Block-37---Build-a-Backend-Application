import express from "express"
import playersRouter from "./api/players.js"
import statsRouter from "./api/stats.js"
const app = express()
export default app


app.use(express.json())

app.use('/players', playersRouter)

app.use('/stats', statsRouter)


app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send("Sorry, something went wrong.")
})