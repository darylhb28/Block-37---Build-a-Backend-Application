import db from "./client.js";
import players from "./data.js";
import { createPlayer } from "./queries/players.js";
import { createStats } from "./queries/stats.js";

await db.connect()
await seed()
await db.end()
console.log("Let's Go Mets")

async function seed(){
for (const player of players) {
    const createdPlayer = await createPlayer(player.name)
    await createStats({
        average: player.average,
        slugging: player.slugging,
        onbasepct: player.onbasepct,
        playerId: createdPlayer.id
    })
}
}