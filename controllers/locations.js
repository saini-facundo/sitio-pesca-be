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
    newLocation
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
  return res.status(200).json({
    ok: true,
    msg: "editLocation",
  });
};

const getLocations = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "getLocations",
  });
};

const getLocation = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "getLocation",
  });
};

const deleteLocation = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "deleteLocation",
  });
};

module.exports = {
  createLocation,
  editLocation,
  getLocations,
  getLocation,
  deleteLocation,
};
