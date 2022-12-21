const { Router } = require("express");
const {
  createUser,
  editUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/users");
const { validateFields } = require("../middlewares/fieldValidator");

const router = Router();

router.post("/", [validateFields], createUser);

router.put("/", [validateFields], editUser);

router.get("/", [validateFields], getUsers);

router.get("/user", [validateFields], getUser);

router.delete("/", [], deleteUser);

module.exports = router;
