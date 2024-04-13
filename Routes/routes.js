const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser,getAllUsers } = require('../controllers/usersController.js');

// get my information
router.get('/applicant', async (req, res) => {
    try {
      const user = await getUserById(1);
      res.json({MyInfo:user});
    } catch (err) {
      res.status(500).json({ message: `Error getting applicant info : ${err}` });
    }
  });

// Create a new applicant
router.post('/applicant', async (req, res) => {
  try {
    const { username, email,age,lp,gp } = req.body;
    const newUser = await createUser(username, email,age,lp,gp );
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: `Error creating user : ${err}` });
  }
});

// Get an applicant by ID
router.get('/applicant/:applicantId', async (req, res) => {
  try {
    const userId = req.params.applicantId;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: `Error getting  user : ${err}` });
  }
});

// Update an applicant by ID
router.put('/applicant/:applicantId', async (req, res) => {
  try {
    const userId = req.params.applicantId;
    const { username, email } = req.body;
    const updatedUser = await updateUser(userId, username, email);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: `Error updating user : ${err}` });
  }
});

// Delete an applicant by ID
router.delete('/applicant/:applicantId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Error deleting user : ${err}` });
  }
});



// get all applicant
router.get('/all-applicants', async (req, res) => {
    try {
      const users=await getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: `Error getting all users : ${err}` });
    }
  });

module.exports = router;
