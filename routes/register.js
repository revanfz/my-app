const { Router } = require('express');
const { Error } = require('mongoose');
const Account = require('../models/Account');

const router = Router();

router.get('/', async (req, res) => {
    const account = await Account.find();
    try {
        if (!account.length) {
            throw new Error('Tidak ada user yang terdaftar');
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { username, password, date } = req.body;
    const exist = await Account.find({ username });
    try {
        if (exist.length) {
            res.status(400)
            throw new Error('Username already exist');
        }
        const newAccount = new Account({
            username, password, dateCreated: date
        });
        if (!newAccount) {
            res.status(400)
            throw new Error('Data yang dimasukkan tidak valid');
        }
        const account = await newAccount.save();
        if (!account) {
            res.status(500)
            throw new Error('Terjadi kesalahan saat menyimpan data');
        }
        res.status(200).json(account);
    } catch (error) {
        res.json({ message: error.message });
    }
})

router.delete('/:username', async (req, res) => {
    const { username } = req.params;
    const exist = await Account.find({ username });
    try {
        if (!exist.length) {
            res.status(404);
            throw new Error('Username didnt exist');
        }
        const account = await Account.deleteOne({ username });
        if (!account) {
            res.status(505);
            throw new Error('Cannot delete user');
        }
        res.status(200).json({ username });
    } catch (error) {
        res.json({ message: error.message });
    }
})

module.exports = router;