const { response, request } = require("express");

const createUser = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "CreateUser",
  });
};

const editUser = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "editUser",
  });
};

const getUsers = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "getUsers",
  });
};

const getUser = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "getUser",
  });
};

const deleteUser = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "deleteUser",
  });
};

module.exports = {
  createUser,
  editUser,
  getUsers,
  getUser,
  deleteUser,
};
