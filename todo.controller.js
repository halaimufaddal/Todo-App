import Todo from "../models/todo.model.js";

const createTodo= async (req,res)=>{
    const todo= await new Todo({
        text:req.body.text,
        completed:req.body.completed
    });

    try{
        const newTodo=todo.save()
        res.send(201).json({message:"todo created successfully"},newTodo)
    }catch(err) {
        console.log(err);
        res.send(400).json({message:"An error occured"})

    }
};

export const fetchTodo= async(req,res)=>{
    try{
        const todos=await Todo.find();
        res.send(201).json({message:"todo Fetched successfully"},todos)
    }
    catch(err){
        console.log(err);
        res.send(400).json({message:"An error occured"})
    }
};

export const updateTodo=async(req,res)=>{
    try{
        const todos=await Todo.findByIdAndUpdate(req.params.id, req.body,
            {
                new:true
            }
        );
        res.send(201).json({message:"todo Updated successfully"},todos)
    }
    catch(err){
        console.log(err);
        res.send(400).json({message:"An error occured"});
    }

    }

export const deleteTodo= async(req,res)=>{
    try {
       await Todo.findByIdAndDelete(req.params.id)
        res.send(201).json({message:"todo Deleted successfully"},todos)
    
    } catch (error) {
         console.log(error);
        res.send(400).json({message:"An error occured"});
    }
}

export default createTodo;