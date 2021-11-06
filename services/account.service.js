const db = require("../models/index");

module.exports = {
    createAccount,
    getAllAccount
}

async function createAccount({user_name, email, password}) {
    try {
        const account = await db.account.create({user_name,email,password});
        return account;
    } catch (err) {
        console.error(err.message);
        return err
    }
}

async function getAllAccount () {
    try {
        const allAccount = await db.account.findAll();
        return allAccount
    } catch (error) {
        return err;
    }
}