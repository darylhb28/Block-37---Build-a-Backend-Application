import db from "../client.js";

export async function createPlayer(name){
    const sql = `
    INSERT INTO players (name) VALUES ($1) RETURNING *;
    `
    const {rows: [player]} = await db.query(sql, [name])
    return player
}

export async function getPlayers(){
    const sql = `
    SELECT * FROM players;
    `
    const {rows: players} = await db.query(sql)
    return players
}

export async function getPlayerById(id){
    const sql =`
    SELECT * FROM players WHERE id = $1;    
    `
    const {rows: [player]} = await db.query(sql, [id])
    return player
}

export async function deletePlayer(id){
    const sql = `
    DELETE FROM players WHERE id = $1
    `
    const {rows: [player]} = await db.query(sql, [id])
    return player
}

