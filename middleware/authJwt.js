const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index");
const Account = require('../models/account.model');

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}


const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  Account.findByPk(req.userId).then(account => {
    account.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const isStudent = (req, res, next) => {
  Account.findByPk(req.userId).then(account => {
    account.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "student") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require student Role!"
      });
      return;
    });
  });
};


const isMentor = (req, res, next) => {
  Account.findByPk(req.userId).then(account => {
    account.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "mentor") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require mentor Role!"
      });
      return;
    });
  });
};


const isEvaluator = (req, res, next) => {
  Account.findByPk(req.userId).then(account => {
    account.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "evaluator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require evaluator Role!"
      });
      return;
    });
  });
};





const isModerator = (req, res, next) => {
  Account.findByPk(req.userId).then(account => {
    account.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

const isDean = (req, res, next) => {
  Account.findByPk(req.userId).then(account => {
    account.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "dean") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require dean Role!"
      });
    });
  });
};

const isMentorOrEvaluator = (req, res, next) => {
  Account.findByPk(req.userId).then(account => {
    account.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "mentor") {
          next();
          return;
        }

        if (roles[i].name === "evaluator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require mentor or evaluator Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDean: isDean,
  isMentor: isMentor,
  isMentorOrEvaluator: isMentorOrEvaluator,
  isModerator: isModerator,
  isStudent: isStudent,
  isEvaluator: isEvaluator,
  catchError
};
module.exports = authJwt;