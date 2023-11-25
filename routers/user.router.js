const router = require("express").Router();
const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

// register router
router.post("/add-user", controller.register);
// login router
router.post("/login", controller.login);

router.put("/password", auth.checkToken, controller.resetPassword);
router.get("/", auth.checkToken, auth.checkRoleAdmin, controller.listUser);
router.put("/update", auth.checkToken, controller.updateUser);
router.delete(
  "/delete/:id",
  auth.checkToken,
  auth.checkRoleAdmin,
  controller.deleteUser
);

module.exports = router;
