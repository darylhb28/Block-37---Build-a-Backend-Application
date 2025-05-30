import db from "../client.js";

export async function createPlayer(name){
    const sql = `
    INSERT INTO players (name) VALUES ($1) RETURNING *;
    `
    const {rows: [player]} = await db.query(sql, [name])
    return player
}