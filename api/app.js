const express = require('express');
const {collection, addDoc, getDoc, doc} = require('firebase/firestore/lite');
const bcrypt = require('bcrypt');

const api = express();
api.use(express.json());

const {db} = require('../firebase.js');
const UserCollection = collection(db, 'Users')

api.route('/users').post(async (req, res) => {
    //TODO: Validate user data

    let passwordHash = await bcrypt.hash(req.body.password, 10);
    await addDoc(UserCollection, {... req.body, password: passwordHash});
    res.status(201).end();
})
api.route('/login').post(async (req, res) => {
    //TODO: Validate user data

    const user = await getDoc(doc(db, 'user'))
})

api.listen(3000);