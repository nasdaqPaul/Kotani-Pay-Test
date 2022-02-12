const express = require('express');
const jwt = require('jsonwebtoken');
const {collection, addDoc, query, where, getDocs} = require('firebase/firestore/lite');
const bcrypt = require('bcrypt');
const {userValidator, loginValidator} = require('./middleware/requestValidators');
const validateAccessToken = require('./middleware/validateAccessToken');
const jwtSecret = 'secrete_to_be_stored_in_env'

const api = express();
api.use(express.json());

const {db} = require('../firebase.js');
const UserCollection = collection(db, 'Users');

api.route('/users').post(userValidator, async (req, res) => {
    let passwordHash = await bcrypt.hash(req.body.password, 10);

    //TODO: implement validation for non-repeating email in db
    await addDoc(UserCollection, {... req.body, password: passwordHash});
    res.status(201).end();
})
api.route('/login').post(loginValidator, async (req, res) => {
    const q = query(UserCollection, where('email', '==', req.body.email))
    const users = await getDocs(q);

    if(!users.empty){
        const user = users.docs[0].data();
        if (await bcrypt.compare(req.body.password, user.password)){
            const accessToken = await jwt.sign({
                email: user.emailAddress
            }, jwtSecret)
            res.status(200).json({
                accessToken
            })
        }
        else {
            res.status(400).end('Invalid email or password');
        }
    }else {
        res.status(400).end('Invalid email or password');
    }
})

api.listen(3000);