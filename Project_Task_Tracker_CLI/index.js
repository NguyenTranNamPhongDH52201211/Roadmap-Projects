import {Command} from "commander";
import fs from "fs";
import {v4 as uuidv4} from "uuid";

const listTask= new Command();
const DATA_FILE="task.json"; // Duong dan file, ten file can doc

//Doc danh sach
function loadTasks(){
    if(!fs.existsSync(DATA_FILE)) return [];// Kiem tra xem file co ton tai ko
    const data=fs.readFileSync(DATA_FILE,"utf-8"); // Doc file va co dich tieng viet
    if(!data.trim()) return [];
    return JSON.parse(data);// Tra du lieu tu json ve js
}

//Ghi vao danh sach
function saveTasks(tasks){
    fs.writeFileSync(DATA_FILE,JSON.stringify(tasks,null,2)); // Ghi file
}

//Cac thao tac task
// Them task
listTask
        .command("add <nameTask>")
        .description("Add a new task")
        .action((nameTask)=>{
            const tasks=loadTasks();
            const newTask= {id:uuidv4(),nameTask, status:"todo", createAt: new Date()};
            tasks.push(newTask);
            saveTasks(tasks);
            console.log("Add a new task success",nameTask);
        });

//Liet ke task
listTask
       .command("list")
       .description("List all tasks")
       .action(()=>{
        const tasks=loadTasks();
        console.table(tasks);
       });
//Update task
listTask 
       .command("Update <index> <content>")
       .description("Update task by index (starting from 0)")
       .action((index,content)=>{
        const tasks=loadTasks();
        const task =tasks[index];
        if(!task) return console.log("Can't find the task you want to update");
        task.content=content;
        console.log(`Update success: ${index} : ${content}`);
       });

//Delete Task
listTask
        .command("Delete <index>")
        .description("Delete task by index (strating from 0")
        .action((index)=>{
            const tasks=loadTasks();
            const task=tasks[index];
            if(!task) return console.log("Can't find the task you want to delete");
           const deleted=tasks.splice(index,1);//Xoa phan tu tai vi tri index
           saveTasks(tasks);
           console.log("Delete success")

        });
listTask.parse(process.argv);