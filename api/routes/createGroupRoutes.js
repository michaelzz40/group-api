const { Router } = require("express");
const protected = require("../controllers/protectRouteMiddleware");

// File to define all the api routes
module.exports = app => {
  const groups = require("../controllers/createGroupController");

  let router = require("express").Router();

  // Create a new group
  router.post("/", protected, groups.create);

  // Retrieve all groups
  router.get("/", protected, groups.findAll);

  router.get("/expenses/:groupId", protected, groups.getGroupExpenses);

  // Retrieve a single Group with id
  router.get("/:id", protected, groups.findOne);

  // Update a group with id
  router.put("/:id", groups.update);

  // Delete a group with id
  router.delete("/:id", protected, groups.delete);

  // Delete all groups
  router.delete("/", groups.deleteAll);

  app.use("/api/groups", router);
};
