import db from "../client.js";

export async function createStats({average, slugging, onbasepct, playerId}){
const sql = `
INSERT INTO stats (average, slugging, onbasepct, player_id) VALUES ($1, $2, $3, $4) RETURNING *;
`
const {rows: [stats]} = await db.query(sql, [average, slugging, onbasepct, playerId])
return stats
}