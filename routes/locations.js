const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/JWTValidator");
const {
  createLocation,
  editLocation,
  getLocations,
  getLocation,
  deleteLocation,
} = require("../controllers/locations");
const router = Router();

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("coordinates", "Las coordenadas son obligatorias").notEmpty(),
    validateJWT,
    validateFields
  ],
  createLocation
);

router.put("/", [], editLocation);

router.get("/", [], getLocations);

router.get("/location", [], getLocation);

router.delete("/", [], deleteLocation);

module.exports = router;
