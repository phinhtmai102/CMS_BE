// const { group } = require('../models/index');
const { group } = require('../models/index');
const db = require('../models/index');
const pagination = require('../services/pagination');
const topic = db.topic;

module.exports = {
    getAllTopic,
    deleteTopic,
    createTopic,
    // activeTopic,
    // submitTopic,

}
async function createTopic(req, res) {
    // const{
    //     topic_id,
    //     topic_name,
    //     descrition,
    //     groupGroupId
    // } = req.body;

    // const topic = await db.topic.create({
    //     topic_id: topic_id,
    //     topic_name: topic_name,
    //     descrition: descrition
    // });

    // const group = await db.group.findOne({
    //     where: {
    //         group_id: groupGroupId
    //     }
    // }).catch(err => res.send(err.message));
    // console.log(group);

    // const group_topic = await db.topic.create({
    //     topic_id: group.topic_id,
    //     groupGroupId: topic.groupGroupId
    // }).catch(err => res.send(err.message));
    // console.log(group_topic);
    // res.send('ok');
}

// async function activeTopic(req, res){
//     if(activeTopic = true){

//     }
// }

async function getAllTopic(req, res) {
    // await db.topic.findAll().then(async data => {
    //     // res.send(data);
    //     const allTopic = Promise.all(data.map(async topic => {

    //         const info = db.group.findOne({
    //             where: {
    //                 topic_id: group.topic_id
    //             }
    //         });

    //         const group = await info.then(info => {

    //             const group = {
    //                 topic_id: topic.topic_id,
    //                 topic_name: topic.topic_name,
    //                 group_id: group.group_id
    //             }
    //             return group;
    //         });
    //         return await group;
    //     }));
    //     console.log(allTopic);
    //     res.send(await allTopic);
    // }).catch(err => {
    //     res.status(500).send(err);
    // });
}
async function deleteTopic(req, res) {
    // await db.topic.findOne({
    //     where: { id: req.params.id }
    // }).then(data => {
    //     console.log(data);
    //     db.users.destroy({
    //         where: {
    //             id: data.id
    //         }
    //     });
    //     db.studentInfo.destroy({
    //         where: {
    //             id: data.id
    //         }
    //     });
    //     res.send("Delete success")
    // }).catch(err => {
    //     res.status(500).send(err);
    // });
}

