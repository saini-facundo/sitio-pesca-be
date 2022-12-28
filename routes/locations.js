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

router.put("/:id", [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("coordinates", "Las coordenadas son obligatorias").notEmpty(),
  check("description", "La descripción es obligatoria").notEmpty(),
  check("visits", "Las visitas son obligatorias").exists(),
  check("fishes", "El listado de peces es obligatorio").exists(),
  check("places", "El listado de lugares de interés es obligatorio").exists(),
  validateJWT,
  validateFields
], editLocation);

router.get("/", [], getLocations);

router.get("/location", [], getLocation);

router.delete("/", [], deleteLocation);

module.exports = router;
