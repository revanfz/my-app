const Pendapatan = require('../models/Pendapatan');
const { Error } = require('mongoose');
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    const response = await Pendapatan.find();
    try {
        if (!response.length) {
            throw new Error('Tidak ada pendapatan');
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const { value } = req.body;
    const newValue = new Pendapatan({ value });
    try {
        if (!newValue) {
            res.status(400);
            throw new Error('Data tidak valid');
        }
        const pendapatan = await newValue.save();
        if (!pendapatan) {
            res.status(500)
            throw new Error('Tidak dapat menyimpan transaksi')
        }
        res.status(200).json(pendapatan);
    } catch (error) {
        res.json({ message: error.message })
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const exist = Pendapatan.findById(id);
        if (!exist) {
            throw new Error('Id tidak ditemukan');
        }
        const removed = await exist.deleteOne();
        if (!removed) {
            throw new Error('Cannot delete transaction');
        }
        res.status(200).json({ id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;