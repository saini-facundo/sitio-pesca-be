const { response, request } = require("express");

const createLocation = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "CreateLocation",
  });
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
