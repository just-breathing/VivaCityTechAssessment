"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../Controllers/usersController");
const router = express_1.default.Router();
// Get my information
router.get('/applicant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, usersController_1.getUserById)(1);
        res.json({ MyInfo: user });
    }
    catch (err) {
        res.status(500).json({ message: `Error getting applicant info : ${err}` });
    }
}));
// Create a new applicant
router.post('/applicant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, age, lp, gp } = req.body;
        const newUser = yield (0, usersController_1.createUser)(username, email, age, lp, gp);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: `Error creating user : ${err}` });
    }
}));
// Get an applicant by ID
router.get('/applicant/:applicantId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.applicantId, 10);
        const user = yield (0, usersController_1.getUserById)(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: `Error getting user : ${err}` });
    }
}));
// Update an applicant by ID
router.put('/applicant/:applicantId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.applicantId, 10);
        const { username, email } = req.body;
        const updatedUser = yield (0, usersController_1.updateUser)(userId, username, email);
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ message: `Error updating user : ${err}` });
    }
}));
// Delete an applicant by ID
router.delete('/applicant/:applicantId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.applicantId, 10);
        yield (0, usersController_1.deleteUser)(userId);
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: `Error deleting user : ${err}` });
    }
}));
// Get all applicants
router.get('/all-applicants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersController_1.getAllUsers)();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: `Error getting all users : ${err}` });
    }
}));
exports.default = router;
