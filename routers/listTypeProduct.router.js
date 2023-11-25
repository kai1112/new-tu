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

var cpUpload = upload.fields([{ name: "image", maxCount: 1 }]);

// var cpUpload = upload.fields([{ name: "backgroud_avatar", maxCount: 5 }]);
// type product api
router.get("/type-products", controller1.typeProduct);
router.post(
  "/type-products/create",
  upload.array("image", 12),
  controller1.create
);

// select api
router.get("/select-list", controller2.selectList);
router.get("/select-list/detail/:id", controller2.detail);
router.post("/select-list/create", controller2.create);
router.put("/select-list/update/:id", controller2.update);
router.delete("/select-list/delete/:id", controller2.delete);

// api product
// router.delete("/products/:id", controller3.findById);
router.post(
  "/products/add-product",
  auth.checkToken,
  auth.checkRoleAdmin,
  cpUpload,
  controller3.create
);
router.put(
  "/products/update",
  auth.checkToken,
  auth.checkRoleAdmin,
  cpUpload,
  controller3.update
);
router.get(
  "/products",
  auth.checkToken,
  auth.checkRoleAdmin,
  controller3.listProduct
);
router.get("/products/:type", controller3.findBytype);
router.get("/products/detail/:id", controller3.findById);
router.get("/products/search/product", controller3.search);
router.get("/products/pagination/:page", controller3.pagination);
router.post(
  "/products/blog/:id",
  auth.checkToken,
  auth.checkRoleAdmin,
  controller3.blog
);
router.post("/products/comment/:id", controller3.comment);
router.post("/products/rate/:id", controller3.review);
router.post("/products/rep/comment/:id", controller3.findProductByIdComment);
router.delete("/products/delete/:id", controller2.delete);
module.exports = router;
