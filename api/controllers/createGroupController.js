// File for the app controller
const db = require('../models');
const Group = db.groups;

// Create a new group
exports.create = (req, res) => {
    // Validate create group request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a new group
    const userGroup = {
        companyName: req.body.companyName
    }

    // Save the group name in database
    Group.create(userGroup)
    .then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the group."
            }
        );
    });    
}

// Retrieve all requests from the database
exports.findAll = (req, res) => {
    Group.findAll({ where: {userId: req.user.userId }}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving groups."
            }
        );
    });
}

// Find a single group with the group name
exports.findOne = async (req, res) => {
    const id = req.params.id
    let group = null;
    try {
        group = await Group.findByPk(id);
    } catch (error) {
        return res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving groups."
            })
    } if (!group) {
        return res.status(404).send({
            message: "group not found"
        })
    }
  
    return res.send(group);
}

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
            })
        } else {
            res.send({
                message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Group with id=" + id
        })
    });
}

// Delete a Group with the specified id in the group
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Group.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Group was deleted successfully!"
            })
        } else {
            res.send({
                message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Group with id=" + id
        })
    });
}

// Delete all Groups from the database.
exports.deleteAll = (req, res) => {
    Group.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Groups were deleted successfully!`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Groups."
        })
    });
}