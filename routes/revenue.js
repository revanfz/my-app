const { Router } = require('express');
const Revenue = require('../models/Revenue');

const router = Router();

router.get('/', async (req, res) => {
    const revenue = await Revenue.find({ _v: 0 });
    try {
        if (!revenue) {
            throw new Error('Tidak ada catatan pendapatan');
        }
        res.json(revenue);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { price, date } = req.body;
    const newRevenue = new Revenue({
        price, date
    });
    try {
        if (!newRevenue) {
            throw new Error('Data yang dimasukkan tidak valid');
        }
        const revenue = newRevenue.save();
        if (!revenue) {
            throw new Error('Terjadi kesalahan saat menyimpan data');
        }
        res.status(200).json({ message: `Transaksi ${price} pada ${date.toString()} berhasil disimpan`});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;