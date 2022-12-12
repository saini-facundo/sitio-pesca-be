const { Router } = require("express");
const {
  createLocation,
  editLocation,
  getLocations,
  getLocation,
  deleteLocation,
} = require("../controllers/locations");
const router = Router();

router.post("/", [], createLocation);

router.put("/", [], editLocation);

router.get("/", [], getLocations);

router.get("/location", [], getLocation);

router.delete("/", [], deleteLocation);

module.exports = router;
