const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  login,
  editUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/users");
const { validateFields } = require("../middlewares/fieldValidator");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("surname", "El apellido es obligatorio").notEmpty(),
    check("username", "El nombre de usuario es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe tener 6 caracteres como minimo"
    ).isLength(6),
    validateFields,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("username", "El nombre de usuario es obligatorio").notEmpty(),
    check(
      "password",
      "El password debe tener 6 caracteres como minimo"
    ).isLength(6),
    validateFields,
  ],
  login
);

router.put("/", [validateFields], editUser);

router.get("/", [validateFields], getUsers);

router.get("/user", [validateFields], getUser);

router.delete("/", [], deleteUser);

module.exports = router;
