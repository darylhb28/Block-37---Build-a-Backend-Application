import db from "../client.js";

export async function createStats({average, slugging, onbasepct, playerId}){
const sql = `
INSERT INTO stats (average, slugging, onbasepct, player_id) VALUES ($1, $2, $3, $4) RETURNING *;
`
const {rows: [stats]} = await db.query(sql, [average, slugging, onbasepct, playerId])
return stats
}

export async function getStats(){
    const sql = `
    SELECT * FROM stats;
    `
    const {rows:stats} = await db.query(sql)
    return stats
}

export async function updateStatsByPlayerId({id, average, slugging, onbasepct}){
const sql = `
UPDATE stats
SET average = $1, slugging = $2, onbasepct = $3
WHERE player_id = $4
RETURNING * ;`
const {rows: [stats]} = await db.query(sql, [average, slugging, onbasepct, id])
return stats
}