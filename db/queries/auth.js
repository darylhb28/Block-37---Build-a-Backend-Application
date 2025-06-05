import db from "../client.js";
import bcrypt from "bcrypt"

export async function registerUser({email, password}){
const hashedPassword = await bcrypt.hash(password, 5)
const sql = `INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *;`

const {rows: [user]} = await db.query(sql, [email, hashedPassword])
return user

}

export async function loginUser({email}){
const sql = `SELECT * FROM users WHERE email = $1`

const {rows: [user]} = await db.query(sql, [email])
return user

}