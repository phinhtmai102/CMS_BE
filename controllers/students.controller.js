// const { callbackPromise } = require('nodemailer/lib/shared');
// const { studentInfo } = require('../models/index');
const db = require('../models/index');
const pagination = require('../services/pagination');
const student = db.studentInfo;

module.exports = {
    getAllStudents,
    getStudent,
    deleteStudent,
    updateStudent,
    paginationS,
    // findAllPublished
}


//pagination
async function paginationS(req, res) {
    
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);

    db.studentInfo.findAndCountAll({ limit, offset })
        .then(data => {
            const response = pagination.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error"
            });
        });
}

// // find all published Tutorial
// async function findAllPublished(req, res) {
//     const { page, size } = req.query;
//     const { limit, offset } = pagination.getPagination(page, size);

//     db.studentInfo.findAndCountAll({ where: { published: true }, limit, offset })
//         .then(data => {
//             const response = pagination.getPagingData(data, page, limit);
//             res.send(response);
//         })
// }

async function getAllStudents(req, res) {
    await db.studentInfo.findAll().then(async data => {
        // res.send(data);
        const allStudents = Promise.all(data.map(async student => {

            const info = db.users.findOne({
                where: {
                    user_id: student.user_id
                }
            });

            const user = await info.then(info => {

                const user = {
                    id: student.id,
                    user_name: info.last_name + info.first_name,
                    date_of_birth: info.date_of_birth,
                    phone_number: info.phone_number,
                    // email: account.email,
                    code: student.code,
                    typeofcapstones: student.typeofcapstones,
                    average_grade: student.average_grade,
                    note: student.note,
                    major_id: student.major_id
                }
                return user;
            });
            return await user;
        }));
        console.log(allStudents);
        res.send(await allStudents);
    }).catch(err => {
        res.status(500).send(err);
    });
}

async function getStudent(req, res) {
    await db.studentInfo.findOne({
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
                // email: account.email,
                code: data.code,
                typeofcapstones: data.typeofcapstones,
                average_grade: data.average_grade,
                note: data.note,
                major_id: data.major_id
            }
            return user;
        });
        res.send(await user);
    }).catch(err => {
        res.status(500).send(err);
    });
}

async function deleteStudent(req, res) {
    await db.studentInfo.findOne({
        where: { id: req.params.id }
    }).then(data => {
        console.log(data);
        db.users.destroy({
            where: {
                user_id: data.user_id
            }
        });
        db.studentInfo.destroy({
            where: {
                id: data.id
            }
        });
        res.send("Delete success")
    }).catch(err => {
        res.status(500).send(err);
    });
}

async function updateStudent(req, res) {
    const { first_name, last_name, email, date_of_birth, phone_number, major_id } = req.body;
    await db.studentInfo.findOne({
        where: { id: req.params.id }
    }).then(async data => {
        const user = await db.users.findOne({
            where: {
                user_id: data.user_id
            }
        });
        await db.studentInfo.update({ major_id: major_id }, { where: { id: data.id } });
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




