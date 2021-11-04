const router = require("express").Router();
const conn = require("../database/db");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username.length == 0 || password.length == 0) {
    return res.send("All Fields are Required");
  }
  let user = [];
  if (username == "Admin" && password == "admin") {
    user = ["Admin", "0756234512", "Administrator", "admin@mail.com"];
    res.send(user);
  } else {
    res.send("Incorrect Username or Password");
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  conn.query(
    `SELECT * FROM customers_tbl WHERE customer_username = ?`,
    username,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      if (first_res.length === 0) {
        conn.query(
          `INSERT INTO customers_tbl SET ?`,
          {
            customer_username: username,
            customer_email: email,
            customer_password: password,
            customer_date: Date.now(),
          },
          (insert_err, insert_res) => {
            if (insert_err) throw insert_err;
            res.send("Registration Successful");
          }
        );
      } else {
        res.send("Username Already Taken");
      }
    }
  );
});

router.post("/user-update/:id", async (req, res) => {
  const { username, password, email } = req.body;
  conn.query(
    `UPDATE customers_tbl SET ?  WHERE customer_id = ?`,
    [
      {
        customer_username: username,
        customer_email: email,
        customer_password: password,
      },
      req.params.id,
    ],
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send("Error Occured");
      } else {
        res.send("Profile Editted");
      }
    }
  );
});

router.post("/user-login", async (req, res) => {
  const { username, password } = req.body;
  if (username.length == 0 || password.length == 0) {
    return res.send("All Fields are Required");
  }
  conn.query(
    `SELECT * FROM customers_tbl WHERE 
    customer_username = ? AND customer_password = ?`,
    [username, password],
    (first_err, first_res) => {
      if (first_err) throw first_err;
      if (first_res.length === 0) {
        res.send("Incorrect Username or Password");
      } else {
        res.send(first_res);
      }
    }
  );
});

router.post("/new-order", async (req, res) => {
  const { address, total, id, items, method } = req.body;
  JSON.parse(items).forEach((i) => {
    conn.query(
      `SELECT * FROM foods_tbl WHERE food_id = ?`,
      i.cartItemAdded,
      (err, result) => {
        if (err) throw err;
        conn.query(
          `UPDATE foods_tbl SET ? WHERE food_id = ?`,
          [
            {
              food_qty: result[0].food_qty - i.cartNumber,
            },
            i.cartItemAdded,
          ],
          (error, results) => {
            if (error) throw error;
          }
        );
      }
    );
  });
  conn.query(
    `INSERT INTO order_tbl SET ?`,
    {
      customer_address: address,
      order_amount: total,
      customer_id: id,
      order_items: items,
      order_status: "pending",
      payment_method: method,
      order_date: Date.now(),
    },
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send("Order Done");
    }
  );
});

router.post("/edit-food/:id", async (req, res) => {
  const { name, qty, description, category, price, discount } = req.body;
  conn.query(
    `UPDATE foods_tbl SET ? WHERE food_id = ?`,
    [
      {
        food_name: name,
        food_qty: qty,
        food_description: description,
        food_category: category,
        food_prices: price,
        food_discount: discount,
      },
      req.params.id,
    ],
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send("ok");
    }
  );
});

router.get("/food", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  foods_tbl`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/order", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  order_tbl`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/food/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  foods_tbl WHERE food_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/customer", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  customers_tbl`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/customer/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM customers_tbl 
     WHERE customer_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/order/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM order_tbl 
    JOIN customers_tbl ON 
    customers_tbl.customer_id = order_tbl.customer_id
     WHERE order_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/finish/:id", async (req, res) => {
  conn.query(
    `UPDATE order_tbl SET ? WHERE order_id = ?`,
    [
      {
        order_status: "finished",
      },
      req.params.id,
    ],
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send("ok");
    }
  );
});

router.get("/cancel/:id", async (req, res) => {
  conn.query(
    `UPDATE order_tbl SET ? WHERE order_id = ?`,
    [
      {
        order_status: "cancelled",
      },
      req.params.id,
    ],
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send("ok");
    }
  );
});

router.get("/delete-product/:id", async (req, res) => {
  conn.query(
    `DELETE FROM foods_tbl 
    WHERE food_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send("ok");
    }
  );
});

router.get("/delete-customer/:id", async (req, res) => {
  conn.query(
    `DELETE FROM customers_tbl 
    WHERE customer_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send("ok");
    }
  );
});

router.get("/doughnut", async (req, res) => {
  let today =
    new Date(Date.now()).getDate() +
    "-" +
    (new Date(Date.now()).getMonth + 1) +
    "-" +
    new Date(Date.now()).getFullYear();
  let orders = 0;
  let customer = 0;
  conn.query(`SELECT * FROM customers_tbl`, (first_err, first_res) => {
    if (first_err) {
      console.log(first_err);
    } else {
      first_res.forEach((i) => {
        let customer_date =
          new Date(parseInt(i.customer_date)).getDate() +
          "-" +
          (new Date(parseInt(i.customer_date)).getMonth + 1) +
          "-" +
          new Date(parseInt(i.customer_date)).getFullYear();
        if (customer_date === today) {
          customer++;
        }
      });
      conn.query(`SELECT * FROM order_tbl`, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          result.forEach((v) => {
            let order_date =
              new Date(parseInt(v.order_date)).getDate() +
              "-" +
              (new Date(parseInt(v.order_date)).getMonth + 1) +
              "-" +
              new Date(parseInt(v.order_date)).getFullYear();
            if (order_date === today) {
              orders++;
            }
          });

          res.send([customer, orders]);
        }
      });
    }
  });
});

module.exports = router;
