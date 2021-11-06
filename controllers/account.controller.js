const createAccounts = require('../services/account.service');
const db = require('../models/index');
const generatePassword = require('../helper/generatorPassword');
const Op = db.Sequelize.Op;
var bcrypt = require('bcrypt');
const pagination = require('../services/pagination');
module.exports = {
  createAccount,
  getAllAccount,
  getAccount,
  deleteAccount,
  updateAccount,
  paginationS
}

async function paginationS(req, res) {

  const { page, size } = req.query;
  const { limit, offset } = pagination.getPagination(page, size);

  db.account.findAndCountAll({ limit, offset })
    .then(data => {
      const response = pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error."
      });
    });
}

async function createAccount(req, res) {
  const {
    first_name,
    last_name,
    email,
    roles
  } = req.body;

  const password = await generatePassword();

  let bcryptPassword = await bcrypt.hash(password, 10);
  const account = await db.account.create({
    user_name: last_name + ' ' + first_name,
    email: email,
    password: bcryptPassword
  });
  if (roles) {
    db.role.findAll({
      where: {
        name: {
          [Op.or]: roles
        }
      }
    }).then(roles => {
      account.setRoles(roles).then(() => {
        res.send({
          message: "User was registered successfully!"
        });
      });
    }).catch(err => res.send(err.message));
  } else {
    // user role = 1
    account.setRoles([1]).then(() => {
      res.send({
        message: "User was registered successfully!"
      });
    }).catch(err => res.send(err.message));
  }
}

async function getAllAccount(req, res) {
  await db.account.findAll().then(async data => {
    // res.send(data);
    const allAccounts = Promise.all(data.map(async account => {
      var roles = [];
      var roleaccount = await account.getRoles()
      for (let i = 0; i < roleaccount.length; i++) {
        roles.push("ROLE_" + roleaccount[i].name.toUpperCase());
      }
      // console.log(roles)
      var user = {
        account_id: account.account_id,
        user_name: account.user_name,
        email: account.email,
        roles: [...roles]
      }
      return user;
    }));
    res.send(await allAccounts);
  }).catch(err => {
    res.status(500).send(err);
  });
}

async function getAccount(req, res) {
  const account_id = req.params.id;
  console.log(account_id);
  await db.account.findOne({
    where: {
      account_id: account_id
    }
  }).then(async account => {
    const roles = [];
    var roleaccount = await account.getRoles()
    for (let i = 0; i < roleaccount.length; i++) {
      roles.push("ROLE_" + roleaccount[i].name.toUpperCase());
    }

    res.send(user = {
      account_id: account.account_id,
      user_name: account.user_name,
      email: account.email,
      password: account.password,
      roles: [...roles]
    });
  }).catch(err => {
    res.status(500).send(err);
  });
}

async function deleteAccount(req, res) {
  const account_id = req.params.id;
  await db.account.findOne({
    where: {
      account_id: account_id
    }
  })
    .then(async account => {
      await account.removeRoles();
      await db.account.destroy({
        where: {
          account_id: account_id
        }
      });
      res.send("delete success");
    }).catch(err => {
      res.status(500).send(err);
    });
}

async function updateAccount(req, res) {
  const {
    user_name,
    password,
    roles
  } = req.body;
  let bcryptPassword = await bcrypt.hash(password, 10);
  const account = await db.account.findOne({
    where: {
      account_id: req.params.id
    }
  }).then(async account => {
    if (roles) {
      db.role.findAll({
        where: {
          name: {
            [Op.or]: roles
          }
        }
      }).then(roles => {
        account.setRoles(roles).then(() => {
          res.send({
            message: "User was update successfully!"
          });
        });
      }).catch(err => res.send(err.message));
    }
    await db.account.update({
      user_name: user_name,
      password: password
    }, {
      where: {
        account_id: req.params.id
      }
    });
    res.send("update success");
  }).catch(err => {
    res.status(500).send(err.message);
  })
}