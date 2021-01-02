const { Router } = require("express");

// File to define all the api routes
module.exports = app => {
    const groups = require('../controllers/createGroupController');

    let router = require('express').Router();

    // Create a new group
    router.post("/", groups.create);

    // Retrieve all groups
    router.get("/", groups.findAll);

    // Retrieve a single Group with id
    router.get("/:id", groups.findOne);

    // Update a group with id
    router.put("/:id", groups.update);

    // Delete a group with id
    router.delete("/:id", groups.delete);

    // Delete all groups
    router.delete("/", groups.deleteAll);

    app.use('/api/groups', router);
}