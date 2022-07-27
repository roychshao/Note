import { pool } from './db_pool.js';

function print_error(err) {
    console.log("error: " + err.message);
}

const get_items = (user_id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM item WHERE user_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, user_id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const search_items = (user_id, search_str) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM item WHERE user_id = ? AND title REGEXP "${search_str}"`;
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, user_id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const insert_item = (user_id, id, title, description, date, time) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO item(id, user_id, title, description, date, time) VALUE(?,?,?,?,?,?)";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                console.log("pool connected.");
                await conn.query(sql, [id, user_id, title, description, date, time], (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const delete_item = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "DELETE FROM item WHERE id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

export default { get_items, search_items, insert_item, delete_item }
