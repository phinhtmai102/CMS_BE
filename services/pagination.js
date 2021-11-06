const db = require("../models/index");

module.exports = {
    paginationPage,
    getPagination,
    getPagingData
}

function getPagination(page, size) {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

//getPage
function getPagingData(data, page, limit) {
    const { count: totalItems, rows: dataB } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, dataB, totalPages, currentPage };
};

// const getPagination = (page, size) => {
//     const limit = size ? +size : 3;
//     const offset = page ? page * limit : 0;

//     return { limit, offset };
// };

// //getPage
// const getPagingData = (data, page, limit) => {
//     const { count: totalItems, rows: dataB } = data;
//     const currentPage = page ? +page : 0;
//     const totalPages = Math.ceil(totalItems / limit);

//     return { totalItems, dataB, totalPages, currentPage };
// };

//pagination
async function paginationPage(dbase, limitNumber, pageNumber) {
    // const { page, size } = req.query;
    const { limit, offset } = getPagination(pageNumber, limitNumber);
    return dbase.splice(offset, limit);

    // dataB.findAndCountAll({ limit, offset })
    //     .then(data => {
    //         const response = getPagingData(data, page, limit);
    //         // res.send(response);
    //     })
}