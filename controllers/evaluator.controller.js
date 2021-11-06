const db = require('../models/index');
var bcrypt = require("bcryptjs");
const generatePassword = require("../helper/generatorPassword");
const config = require('../config/auth.config');
const sendGmail = require("../services/sendGmail");
const Op = db.Sequelize.Op;
const pagination = require('../services/pagination');

module.exports = {
    getAllEvaluator,
    getEvaluator,
    creatAccount,
    updateAccount,
    paginationS
}

async function paginationS(req, res) {

    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);

    db.evaluatorInfo.findAndCountAll({ limit, offset })
        .then(data => {
            const response = pagination.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ."
            });
        });
}

async function getAllEvaluator(req, res) {
    await db.evaluatorInfo.findAll().then(async data => {

        const allEvaluators = Promise.all(data.map(async evaluator => {

            const info = db.users.findOne({
                where: {
                    user_id: evaluator.user_id
                }
            });

            const user = await info.then(info => {

                const user = {
                    id: evaluator.id,
                    user_name: info.last_name + info.first_name,
                    date_of_birth: info.date_of_birth,
                    phone_number: info.phone_number,
                    degree: evaluator.degree,
                    department_id: evaluator.department_id
                }
                return user;
            });
            return await user;
        }));
        console.log(allEvaluators);
        res.send(await allEvaluators);
    }).catch(err => {
        res.status(500).send(err);
    });
}

async function getEvaluator(req, res) {
    await db.evaluatorInfo.findOne({
        where: {
            id: req.params.id
        }
    }).then(async data => {
        // res.send(data);
        const info = db.users.findOne({
            where: {
                user_id: data.user_id
            }
        });

        const user = await info.then(info => {
            const user = {
                id: data.id,
                user_name: info.last_name + info.first_name,
                date_of_birth: info.date_of_birth,
                phone_number: info.phone_number,
                degree: data.degree,
                department_id: data.department_id
            }
            return user;
        });
        res.send(await user);
    }).catch(err => {
        res.status(500).send(err);
    });
}


async function creatAccount(req, res) {
    const {
        first_name,
        last_name,
        email,
        date_of_birth,
        phone_number,
        degree,
        department_id
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
        // user role = 3 => evaluator
        account.setRoles([3]).then(() => {
            // res.send({ message: "User was registered successfully!" });
        });
    }

    const user = await db.users.create({
        first_name: first_name,
        last_name: last_name,
        date_of_birth: date_of_birth,
        phone_number: phone_number,
        account_id: account.account_id
    }).catch(err => res.send(err.message));

    const evaluator = await db.evaluatorInfo.create({
        degree: degree,
        user_id: user.user_id,
        department_id: department_id
    }).catch(err => res.send(err.message));
    sendGmail.sendInfoAccout({
        toEmail: email,
        account_password: password,
        user_name: last_name + ' ' + first_name
    });


    const userInfo = {
        account,
        user,
        evaluator
    }
    res.send(userInfo);
}

//update evaluator
async function updateAccount(req, res) {
    const { first_name, last_name, email, date_of_birth, phone_number, degree, department_id } = req.body;
    await db.evaluatorInfo.findOne({
        where: { id: req.params.id }
    }).then(async data => {
        const user = await db.users.findOne({
            where: {
                user_id: data.user_id
            }
        });
        await db.evaluatorInfo.update({
            degree: degree,
            department_id: department_id
        }, { where: { id: data.id } });
        await db.users.update({
            first_name: first_name,
            last_name: last_name,
            date_of_birth: date_of_birth,
            phone_number: phone_number
        }, {
            where: {
                user_id: data.user_id
            }
        });
        await db.account.update({
            email: email
        }, {
            where: {
                account_id: user.account_id
            }
        });
        res.send("Ok");
    }).catch(err => {
        res.status(500).send(err);
    });
}