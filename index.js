import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { loginValidation, registerValidation } from "./validations/auth.js";
import { todoValidation } from "./validations/todo.js";
import {
	DashboardController,
	GroupController,
	ProfileController,
	TodoController,
	UserController
} from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { groupValidation } from "./validations/group.js";

mongoose
	.connect(
		"mongodb+srv://soda:19092005@cluster0.de0om.mongodb.net/todo?retryWrites=true&w=majority"
	)
	.then(() => console.log("DB ok"))
	.catch((err) => console.log("DB Error", err));

const app = express();
app.use(cors());
app.use(express.json());
app.get("/api", (req, res) => {
	res.json({
		message: "ok back",
	});
});
app.post(
	"/auth/login",
	loginValidation,
	handleValidationErrors,
	UserController.login
);
app.post(
	"/auth/register",
	registerValidation,
	handleValidationErrors,
	UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/app/getCount", checkAuth, DashboardController.getCount);
app.get("/app/profile/:id", checkAuth, ProfileController.getInfo);

app.get("/app/todo", checkAuth, TodoController.getAll);
app.get("/app/todo/:id", checkAuth, TodoController.getOne);
app.post(
	"/app/todo",
	checkAuth,
	todoValidation,
	handleValidationErrors,
	TodoController.create
);
app.delete("/app/todo/:id", checkAuth, TodoController.remove);
app.patch(
	"/app/todo/:id",
	checkAuth,
	todoValidation,
	handleValidationErrors,
	TodoController.update
);

app.get("/app/groups", checkAuth, GroupController.getAll);
app.post(
	"/app/groups",
	checkAuth,
	groupValidation,
	handleValidationErrors,
	GroupController.create
);
app.get("/app/groups/:id", checkAuth, GroupController.getOne);
app.patch(
	"/app/groups/:id",
	checkAuth,
	groupValidation,
	handleValidationErrors,
	GroupController.update
);
app.delete("/app/groups/:id", checkAuth, GroupController.remove);

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log("Server OK");
});
