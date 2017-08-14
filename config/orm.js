//import mysql connection
var connectoin = require("../config/connection.js");

//function for mysql syntax
function printQuestionMarks (num) {
    var arr = [];
    for (var i=0; i<num; i++){
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(obj){
    var arr = [];
    for (var key in obj){
        if (Object.hasOwnProperty.call(obj,key)){
            arr.push(key + "=" + obj[key]);
        }
    }

    return arr.toString();
}

//orm functions
var orm = {
    selectAll: function(table, cb){
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";

        connection.query(queryString, vals, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table; 

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result){
            if(err) {
                throw err;
            }

            cb(result);
        });
    },

    delete: function(table, condition, cb){
        var queryString = "DELETE FROM" + table;
        queryString += " WHERE";
        queryString += condition;

        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

//export orm object for the model burger.js
module.exports = orm; 