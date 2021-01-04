// File for the app controller
const db = require("../models");
const Group = db.groups;
const Users = db.users;
const UserGroup = db.userGroups;
const Expense = db.expenses;

// Create a new group
exports.create = async (req, res) => {
  // Validate create group request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a new group
  const newGroup = {
    companyName: req.body.companyName
  };
  const user = await Users.findByPk(req.user.userId);

  if (user) {
    // Save the group name in database

    try {
      const group = await Group.create(newGroup);
      const userGroup = await UserGroup.create({
        groupId: group.groupId,
        userId: user.userId
      });
      const result = await UserGroup.findOne({
        include: {
          model: Group,
          attributes: ["groupId", "companyName", "totalExpense"]
        },
        where: { groupId: group.groupId, userId: user.userId }
      });
      console.log(userGroup);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
};

// Retrieve all groups where the user is within the group from the database
exports.findAll = async (req, res) => {
  try {
    const groups = await UserGroup.findAll({
      where: { userId: req.user.userId },
      include: {
        model: Group,
        attributes: ["groupId", "companyName", "totalExpense"]
      }
    });

    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
  }
};

// Find a single group with the group name
exports.findOne = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let group = null;
  try {
    group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).send({
        message: "group not found"
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while retrieving groups."
    });
  }

  try {
    const userGroup = await UserGroup.findAll({
      include: {
        model: Users,
        attributes: ["firstName", "email", "lastName"]
      },
      where: { groupId: id }
    });
    if (!userGroup) {
      return res.status(401).send("Not Authorized for this group!");
    }
    console.log(userGroup);
    return res.status(200).json(userGroup);
  } catch (error) {
    return res.status(500).send("Error gathering data!");
  }
};

// Update a Group by the id in the group
exports.update = (req, res) => {
  const id = req.params.id;

  Group.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Group was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Group with id=" + id
      });
    });
};

// Delete a Group with the specified id in the group
exports.delete = async (req, res) => {
  const id = req.params.id;

  const user = await UserGroup.findOne({
    where: {
      groupId: id,
      userId: req.user.userId
    }
  });

  if (!user) {
    return res.status(404).send("User Not Found");
  }

  if (!user.isAdmin) {
    return res.status(401).send("Not Authorized for removing the group");
  }

  await UserGroup.destroy({
    where: {
      groupId: id
    }
  });

  await Expense.destroy({
    where: {
      groupId: id
    }
  });

  Group.destroy({
    where: { groupId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Group was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Group with id=" + id
      });
    });
};

// Delete all Groups from the database.
exports.deleteAll = (req, res) => {
  Group.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Groups were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Groups."
      });
    });
};

// Retrieve all groups where the user is within the group from the database
exports.getGroupExpenses = async (req, res) => {
  try {
    const groupExpenses = await Expense.findAll({
      where: { groupId: req.params.groupId },
      include: {
        model: Users,
        attributes: ["firstName", "lastName", "email"]
      }
    });

    if (!groupExpenses) {
      return res.status(404).send("Expenses Not Found");
    }

    return res.status(200).json(groupExpenses);
  } catch (error) {
    console.log(error);
  }
};
