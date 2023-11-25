const router = require("express").Router();
const controller1 = require("../controllers/listTypeProduct.controller");
const controller2 = require("../controllers/selectList.controller");
const controller3 = require("../controllers/product.controller");
const auth = require("../middlewares/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    const ext = arr[arr.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});
const upload = multer({ storage: storage });

// var cpUpload = upload.fields([{ name: "backgroud_avatar", maxCount: 5 }]);
// type product api
router.get("/type-products", controller1.typeProduct);
router.post(
  "/type-products/create",
  upload.array("img", 12),
  controller1.create
);

// select api
router.get("/select-list", controller2.selectList);
router.get("/select-list/detail/:id", controller2.detail);
router.post("/select-list/create", controller2.create);
router.put("/select-list/update/:id", controller2.update);
router.delete("/select-list/delete/:id", controller2.delete);

// api product
router.post("/products", controller3.listProduct);
router.put("/products/:type", controller3.findBytype);
router.delete("/products/:id", controller3.findById);
module.exports = router;
