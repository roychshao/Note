import mysql from 'mysql';

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "620109roy",
    port: 3306,
    database: "Note",
    multipleStatements: true
})
