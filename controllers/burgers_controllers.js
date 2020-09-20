var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
const burger = require("../models/burger.js");
const connection = require("../config/connection.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    // data is our result - our array of burgers
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create(["burger_name"], [req.body.burger_name], function(result) {
    res.redirect("/");
  });
});

//this works, but you have to manually refresh the page
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

//   connection.query("UPDATE burgers SET devoured = true WHERE id = ?" [req.body.devoured, req.params.id], function(err, result) {
//     if(err) throw err
  
//     res.status(200);
//   })
  burger.update({
      devoured: true
    }, condition, function() {
      res.redirect("/");
    }
  );
});

//delete is not working
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function() {
      if (result.affectedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
})

// Export routes for server.js to use.
module.exports = router;
