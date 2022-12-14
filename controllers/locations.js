const { response, request } = require("express");
const Location = require("../models/location");

const createLocation = async (req = request, res = response) => {
  try {
    const {
      name,
      coordinates,
      description = "",
      visits = 0,
      fishes = [],
      places = [],
      active = true,
    } = req.body;
    const locationDB = await Location.findOne({ name });
    if (locationDB) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una zona con ese nombre",
      });
    }

    const newLocation = new Location({
      name,
      coordinates,
      description,
      visits,
      fishes,
      places,
      active,
    });

    await newLocation.save();

    return res.status(201).json({
      ok: true,
      newLocation,
    });
  } catch (error) {
    console.log("error = ", error);
    return res.status(500).json({
      ok: false,
      msg: "Error en al crear zona",
      error,
    });
  }
};

const editLocation = async (req = request, res = response) => {
  try {
    const { name, coordinates, description, visits, fishes, places } = req.body;
    const paramID = req.params.id;
    const locationDB = await Location.findById(paramID);
    const locationWithSameName = await Location.findOne({ name });

    if (locationWithSameName?.id !== paramID) {
      return res.status(400).json({
        ok: false,
        msg: `Ya existe una zona con el nombre ${name}`,
      });
    }

    if (!locationDB) {
      return res.status(400).json({
        ok: false,
        msg: `No se encontrĂ³ zona con ID ${paramID}`,
      });
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      paramID,
      { name, coordinates, description, visits, fishes, places },
      { new: true }
    );

    return res.status(201).json({
      ok: true,
      updatedLocation,
    });
  } catch (error) {
    console.log("error = ", error);
    return res.status(500).json({
      ok: false,
      msg: "Error en al editar zona",
      error,
    });
  }
};

const getLocations = async (req = request, res = response) => {
  try {
    const locations = await Location.find({ active: true });
    return res.status(201).json({
      ok: true,
      locations,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const getLocation = async (req = request, res = response) => {
  try {
    const paramID = req.params.id;
    const locationDB = await Location.findById(paramID);

    if (!locationDB) {
      return res.status(404).json({
        ok: false,
        msg: `No se se encontĂ³ ninguna zona con ID ${paramID}`,
      });
    }

    return res.status(201).json({
      ok: true,
      user: locationDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const deleteLocation = async (req = request, res = response) => {
  try {
    const paramID = req.params.id;
    const locationDB = await Location.findById(paramID);

    if (!locationDB) {
      return res.status(404).json({
        ok: false,
        msg: `No se se encontĂ³ ninguna zona con ID ${paramID}`,
      });
    }

    const deletedLocation = await Location.findByIdAndUpdate(
      paramID,
      { active: false },
      { new: true }
    );

    return res.status(201).json({
      ok: true,
      user: deletedLocation,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

module.exports = {
  createLocation,
  editLocation,
  getLocations,
  getLocation,
  deleteLocation,
};
