// const express = require('express');
// const router = express.Router();
// const controller = require('../controller/controller');

// router.post('/signup', controller.signup);
// router.post('/login', controller.login);
// router.post('/place-order', controller.placeOrder);
// router.get('/get-orders', controller.getOrders); // Use GET request for fetching orders

// module.exports = router;
// ////
// const mysql = require('mysql');

// const con = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// });

// exports.signup = (req, res) => {
//   const UserName = req.body.USERNAME;
//   const Email = req.body.EMAIL;
//   const Password = req.body.PASSWORD;

//   con.getConnection((err, connect) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       res.status(500).json({ status: 'error', error_detail: 'Database connection error' });
//       return;
//     }

//     console.log('Connected to the database');

//     connect.query(
//       'INSERT INTO customer (CUSTOMER_NAME, CUSTOMER_EMAIL, CUSTOMER_PASSWORD) VALUES (?, ?, ?)',
//       [UserName, Email, Password],
//       (err, row) => {
//         connect.release();
//         if (err) {
//           console.error('Error inserting into customer table:', err);
//           const res_data = { status: 'error', error_detail: err };
//           res.send(res_data);
//         } else {
//           const res_data = {
//             status: 'success',
//             message: 'User registered successfully',
//           };
//           console.log(res_data);
//           res.send(res_data);
//         }
//       }
//     );
//   });
// };

// exports.login = (req, res) => {
//   const Email = req.body.EMAIL;
//   const Password = req.body.PASSWORD;

//   con.getConnection((err, connect) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       res.status(500).json({ status: 'error', error_detail: 'Database connection error' });
//       return;
//     }

//     console.log('Connected to the database');

//     connect.query(
//       'SELECT CUSTOMER_ID, CUSTOMER_NAME, CUSTOMER_EMAIL, CUSTOMER_PASSWORD FROM customer WHERE CUSTOMER_EMAIL = ? AND CUSTOMER_PASSWORD = ?',
//       [Email, Password],
//       (err, row) => {
//         connect.release();
//         if (err) {
//           console.error('Error querying customer table:', err);
//           throw err;
//         } else {
//           if (row.length !== 0) {
//             const res_data = {
//               status: 'success',
//               user_id: row[0].CUSTOMER_ID,
//               user_name: row[0].CUSTOMER_NAME,
//             };
//             res.send(res_data);
//           } else {
//             const res_data = { status: 'invalid' };
//             res.send(res_data);
//           }
//         }
//       }
//     );
//   });
// };

// exports.placeOrder = (req, res) => {
//   const { customer_id, product_id, product_title, delivery_address } = req.body;

//   con.getConnection((err, connect) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return res.status(500).json({ status: 'error', error_detail: 'Database connection error' });
//     }

//     console.log('Connected to the database');

//     const query = 'INSERT INTO orders (customer_id, product_id, product_title, delivery_address) VALUES (?, ?, ?, ?)';

//     connect.query(query, [customer_id, product_id, product_title, delivery_address], (err, result) => {
//       connect.release();
//       if (err) {
//         console.error('Error inserting into orders table:', err);
//         return res.status(500).json({ status: 'error', error_detail: 'Error inserting into orders table' });
//       } else {
//         return res.status(200).json({ status: 'success', message: 'Order placed successfully' });
//       }
//     });
//   });
// };




// exports.getOrders = (req, res) => {
//   const customer_id = req.query.customer_id; // Use req.query to access query parameters

//   con.getConnection((err, connect) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return res.status(500).json({ status: 'error', error_detail: 'Database connection error' });
//     }

//     console.log('Connected to the database');

//     // Query the orders table to fetch orders associated with the customer_id
//     const query = 'SELECT * FROM orders WHERE customer_id = ?';

//     connect.query(query, [customer_id], (err, result) => {
//       connect.release();
//       if (err) {
//         console.error('Error fetching orders:', err);
//         return res.status(500).json({ status: 'error', error_detail: 'Error fetching orders' });
//       } else {
//         return res.status(200).json({ status: 'success', orders: result });
//       }
//     });
//   });
// };
