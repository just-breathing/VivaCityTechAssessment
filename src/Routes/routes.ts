import express, { Request, Response, Router } from 'express';
import { createUser, getUserById, updateUser, deleteUser, getAllUsers } from '../Controllers/usersController';

const router: Router = express.Router();

// Get my information
router.get('/applicant', async (req: Request, res: Response) => {
    try {
        const user = await getUserById(1);
        res.json({ MyInfo: user });
    } catch (err) {
        res.status(500).json({ message: `Error getting applicant info : ${err}` });
    }
});

// Create a new applicant
router.post('/applicant', async (req: Request, res: Response) => {
    try {
        const { username, email, age, lp, gp } = req.body;
        const newUser = await createUser(username, email, age, lp, gp);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ message: `Error creating user : ${err}` });
    }
});

// Get an applicant by ID
router.get('/applicant/:applicantId', async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.applicantId, 10);
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: `Error getting user : ${err}` });
    }
});

// Update an applicant by ID
router.put('/applicant/:applicantId', async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.applicantId, 10);
        const { username, email } = req.body;
        const updatedUser = await updateUser(userId, username, email);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: `Error updating user : ${err}` });
    }
});

// Delete an applicant by ID
router.delete('/applicant/:applicantId', async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.applicantId, 10);
        await deleteUser(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `Error deleting user : ${err}` });
    }
});

// Get all applicants
router.get('/all-applicants', async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: `Error getting all users : ${err}` });
    }
});

export default router;
