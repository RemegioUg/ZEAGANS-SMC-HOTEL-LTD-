const express = require("express");
const conn = require("./database/db");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const uuid = require("uuid");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public", { extensions: ["html", "htm"] }));

app.use("/api/admin/", require("./api/admin"));

function uploading(id) {
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      let dir = "./public/uploads";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: function (req, file, callback) {
      callback(null, id + "-" + file.originalname);
    },
  });
  let uploads = multer({ storage: storage }).array("images");
  return uploads;
}

app.post("/add-food", async (req, res) => {
  let foodId = uuid.v4();
  let upload = uploading(foodId);
  upload(req, res, (err) => {
    if (err) throw err;
    let path = [];
    req.files.forEach((file) => {
      path.push(file.filename);
    });
    const { food, qty, description, discount, category, price } = req.body;
    conn.query(
      `SELECT * FROM foods_tbl WHERE food_name = ?`,
      food,
      (first_err, first_res) => {
        if (first_err) throw first_err;
        if (first_res.length == 0) {
          conn.query(
            `INSERT INTO foods_tbl SET ?`,
            {
              food_id: foodId,
              food_name: food,
              food_description: description,
              food_qty: parseInt(qty),
              food_prices: price,
              food_discount: discount,
              food_category: category,
              food_images: JSON.stringify(path),
            },
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.redirect("./admin/foods");
              }
            }
          );
        } else {
          console.log("An Error Occured");
        }
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
