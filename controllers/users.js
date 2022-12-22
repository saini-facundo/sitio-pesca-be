const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req = request, res = response) => {
  try {
    const { name, surname, username, email, password } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo",
      });
    }
    const user = new User({ name, surname, username, email, password });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      usuario: user,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log("error = ", error);
    return res.status(500).json({
      ok: false,
      msg: "Error en al crear usuario",
      error,
    });
  }
};

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const userDBUsername = await User.findOne({ username });
    const userDBEmail = await User.findOne({ email: username });
    const userDB = userDBUsername || userDBEmail;
    if (!userDB) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con ese correo/username",
      });
    }

    const validPassword = bcryptjs.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con ese password",
      });
    }

    const token = await generateJWT(userDB.id, userDB.name);

    return res.status(200).json({
      ok: true,
      userDB,
      token,
    });
  } catch (error) {
    console.log("error = ", error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor (auth.js/login)",
    });
  }
};

const editUser = async (req = request, res = response) => {
  try {
    const { name, surname } = req.body;
    const paramID = req.params.id;
    const uid = req.uid;
    const userDB = await User.findById(paramID);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: `No se se encontó ningún usuario con ID ${paramID}`,
      });
    }

    if (userDB.id !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puede editar a otro usuario",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      paramID,
      { name, surname },
      { new: true }
    );

    return res.status(201).json({
      ok: true,
      updatedUser,
    });
  } catch (error) {
    console.log("error = ", error);
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const getUsers = async (req = request, res = response) => {
  try {
    const users = await User.find();

    return res.status(201).json({
      ok: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const getUser = async (req = request, res = response) => {
  try {
    const paramID = req.params.id;
    const userDB = await User.findById(paramID);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: `No se se encontó ningún usuario con ID ${paramID}`,
      });
    }

    return res.status(201).json({
      ok: true,
      user: userDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "deleteUser",
  });
};

module.exports = {
  createUser,
  login,
  editUser,
  getUsers,
  getUser,
  deleteUser,
};
