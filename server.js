const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;

// Middleware untuk menyajikan file statis (HTML, CSS, Gambar) dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route default (opsional, karena express.static sudah otomatis mencari index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});