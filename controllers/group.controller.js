// const { student_group, group, student_group } = require('../models/index');
const { student_group } = require('../models/index');
const db = require('../models/index');
// const student_groupModel = require('../models/student_group.model');

module.exports = {
    getAllGroups,
    creatGroups
}

async function creatGroups(req, res) {
    const {
        group_id,
        topic_id,
        status,
        defense_id,
        student_id,
    } = req.body;

    const group = await db.group.create({
        group_id: group_id,
        topic_id: topic_id,
        status: status,
        defense_id: defense_id,

    });

    const student = await db.studentInfo.findOne({
        where: {
            id: student_id
        }
    }).catch(err => res.send(err.message));
    console.log(student);

    const student_group = await db.student_group.create({
        group_id: group.group_id,
        student_id: student.id
    }).catch(err => res.send(err.message));
    console.log(student_group);
    res.send('ok');
}
async function getAllGroups(req, res) {
    await db.group.findAll().then(async data => {

        const groupAll = Promise.all(data.map(async group => {

            const info = db.student_group.findOne({
                where: {
                    group_id: info.group_id
                }
            });

            const student = await info.then(info => {

                const student = {
                    group_id: group.group_id,
                    student_id: student.student_id,
                    final_grade: student_group.final_grade,

                }
                return student;
            });
            return await student;
        }));
        console.log(groupAll);
        res.send(await groupAll);
    }).catch(err => {
        res.status(500).send(err);
    });
}