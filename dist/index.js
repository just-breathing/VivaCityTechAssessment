"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./Routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || "5100");
const Server = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/awesome", routes_1.default);
    return app;
};
const app = Server();
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
exports.default = Server;
