const db = require("../models/index");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const generatePassword = require("../helper/generatorPassword");
const config = require('../config/auth.config');
const sendGmail = require("../services/sendGmail");
const Op = db.Sequelize.Op;
const RefreshToken = db.refreshToken;


const signup = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    date_of_birth,
    phone_number,
    code,
    typeofcapstones,
    average_grade,
    note,
    major
  } = req.body;
  const password = await generatePassword();
  console.log(password);
  //ma hoa password
  let bcryptPassword = await bcrypt.hash(password, 10);
  // Save User to Database
  const account = await db.account.create({
    user_name: last_name + ' ' + first_name,
    email: email,
    password: bcryptPassword
  });

  // const account = db.account.create({
  //   user_name: last_name + ' ' + first_name,
  //   email: email,
  //   password: bcryptPassword
  // }).then(account => {
  if (req.body.roles) {
    db.role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles
        }
      }
    }).then(roles => {
      account.setRoles(roles).then(() => {
        // res.send({ message: "User was registered successfully!" });
      });
    }).catch(err => res.send(err.message));
  } else {
    // user role = 1
    account.setRoles([1]).then(() => {
      // res.send({ message: "User was registered successfully!" });
    });
  }
  //   res.json(account.account_id);

  const user = await db.users.create({
    first_name: first_name,
    last_name: last_name,
    date_of_birth: date_of_birth,
    phone_number: phone_number,
    account_id: account.account_id
  }).catch(err => res.send(err.message));

  const students_info = await db.studentInfo.create({
    code: code,
    typeofcapstones: typeofcapstones,
    average_grade: average_grade,
    note: note,
    major_id: major,
    user_id: user.user_id
  }).catch(err => res.send(err.message));
  sendGmail.sendInfoAccout({
    toEmail: email,
    account_password: password,
    user_name: last_name + ' ' + first_name
  });

  //set roles students cho account
  // res.json(account);
  console.debug(account);

  const userInfo = {
    account,
    user,
    students_info
  }
  res.json(userInfo);
}

const signin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  db.account.findOne({
      where: {
        email: email
      }
    })
    .then( async (account) => {
      if (!account) {
        return res.status(404).send({
          message: "account Not found."
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        account.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({
        id: account.account_id
      }, process.env.jwtsecret, {
        expiresIn: config.jwtExpiration // 24 hours
      });

      let refreshToken = await RefreshToken.createToken(account);

      var authorities = [];
      account.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).json({
          account_id: account.account_id,
          user_name: account.user_name,
          email: account.email,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

const refreshToken = async (req, res) => {
  const {
    refreshToken: requestToken
  } = req.body;

  if (requestToken == null) {
    return res.status(403).json({
      message: "Refresh Token is required!"
    });
  }

  try {
    let refreshToken = await RefreshToken.findOne({
      where: {
        token: requestToken
      }
    });

    console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).json({
        message: "Refresh token is not in database!"
      });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({
        where: {
          id: refreshToken.id
        }
      });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const account = await refreshToken.getAccount();
    let newAccessToken = jwt.sign({
      id: account.id
    }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({
      message: err
    });
  }
}
module.exports = {
  signup,
  signin,
  refreshToken
}