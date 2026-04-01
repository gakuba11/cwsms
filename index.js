const express = require('express');
const app = express();
const port = 5000;
const db = require('./config/db');

app.use(express.json());

app.get('/cars', (req, res) => {
    const sql = "SELECT * FROM car";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/cars', (req, res) => {
    const { PlateNumber, CarType, DriverName, PhoneNumber, CreatedAt } = req.body;

    const sql = `INSERT INTO car (PlateNumber, CarType, DriverName, PhoneNumber, CreatedAt) VALUES (?,?,?,?,?)`;

    db.query(sql, [PlateNumber, CarType, DriverName, PhoneNumber, CreatedAt], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Car added successfully' });
    });
});

app.delete('/cars/:id', (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM car WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Car deleted successfully" });
  });
});

app.get('/payments', (req, res) => {
  const sql = "SELECT * FROM payment";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post('/payments', (req, res) => {
  const { amount, car_id } = req.body;

  const sql = `
    INSERT INTO payment (amount, car_id)
    VALUES (?, ?)
  `;

  db.query(sql, [amount, car_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Payment added" });
  });
});

app.delete('/payments/:id', (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM payment WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Payment deleted" });
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})