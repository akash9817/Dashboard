const con = require('../config/db')


module.exports = {
    createUser: (data, callback) => {
        const sql = 'INSERT INTO users SET ?'
        con.query(sql, data, (err, result) => {
            if(err) {
                return callback(err)
            } return callback(null, result)
        })
    },
    getusers: (callback) => {
        const sql = 'SELECT * from users ORDER BY id DESC'
        con.query(sql, (err, result) => {
            if(err) {
                return callback(err)
            } return callback(null, result)
        })
    },
    updateuser: (data, callback) => {
            //return db.query("UPDATE products SET ? WHERE id=?", [data, input.id], cb)
        const sql = 'UPDATE users SET ? WHERE id=?'
        con.query(sql, [data,data.id] ,(err, result) => {
            if(err) {
                return callback(err)
            } return callback(null, result)
        })
    },
    deleteusers: (data, callback) => {
        const sql = 'DELETE FROM users WHERE Id=?'
        console.log(data)
        con.query(sql, data, (err, result) => {
            if(err) {
                return callback(err)
            } return callback(null, result)
        })
    }
}