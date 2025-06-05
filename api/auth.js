import jwt from "jsonwebtoken"
import express from "express"
import bcrypt from "bcrypt"
import db from "../db/client.js"
import { loginUser, registerUser } from "../db/queries/auth.js"
const router = express.Router()
export default router

export function verifyToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedJWT
  next();
}

router.post('/register', async(req,res,next) => {
const {email, password} = req.body;

if (!email || !password) {
return res.status(401).send('Missing email or password');
}
const newUser = await registerUser({email, password})
const token = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_SECRET);
res.status(201).json(token)
})

router.post('/login', async(req,res,next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(401).send('Missing email or password');
}
    const realUserInfo = await loginUser({email})

    const isPWMatch = await bcrypt.compare(password, realUserInfo.password);

    if(!isPWMatch) return res.status(401).send('Wrong login info');

    const token = jwt.sign({id: realUserInfo.id, email: realUserInfo.email}, process.env.JWT_SECRET);
    res.status(201).json(token);
 
  })