const { Router } = require("express");
const {
  createUser,
  editUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/users");
const router = Router();

router.post("/", [], createUser);

router.put("/", [], editUser);

router.get("/", [], getUsers);

router.get("/user", [], getUser);

router.delete("/", [], deleteUser);

module.exports = router;
