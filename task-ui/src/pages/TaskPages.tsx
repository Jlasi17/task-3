import { useEffect, useState } from "react";
import { Task } from "../types/task";
import TaskList from "../components/TaskList";
import {
  getAllTasks,
  deleteTask,
  runTaskExecution,
  searchTasksByName,
} from "../api/taskApi";

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    const all = await getAllTasks();
    setTasks(all);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task handler
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  // Run task handler
  const handleRun = async (task: Task) => {
    await runTaskExecution(task.id);
    fetchTasks(); // fetch updated executions
  };

  // Search task handler
  const handleSearch = async (name: string) => {
    const result = await searchTasksByName(name);
    setTasks(result);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onRun={handleRun}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default TaskPage;
