import express from "express"
import createTodo, { deleteTodo, fetchTodo, updateTodo } from "../controllers/todo.controller.js";


const router= express.Router();

router.post("/create",createTodo);
router.get('/fetch',fetchTodo);
router.put("/update/:id",updateTodo);
router.delete("/delete/:id",deleteTodo);

export default router