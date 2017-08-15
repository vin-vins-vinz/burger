//require express and setup router
var express = require("express");

var router = express.Router();

//import the model burger.js
var burger = require("../models/burger.js");

//create routes
router.get("/", function(req, res){
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res){
    burger.insertOne([
        "burger_name"
    ],[
        req.body.burger_name
    ], function(){
        res.redirect("/");
    });
});

router.put("/:id", function(req, res){
    var condition = "id = " + req.params.id;
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(){
        res.redirect("/");
    });
});

//export routes for server.js
module.exports = router;