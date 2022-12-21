const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  editUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/users");
const { validateFields } = require("../middlewares/fieldValidator");

const router = Router();

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("surname", "El apellido es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validateFields,
  ],
  createUser
);

router.put("/", [validateFields], editUser);

router.get("/", [validateFields], getUsers);

router.get("/user", [validateFields], getUser);

router.delete("/", [], deleteUser);

module.exports = router;
