import { Task } from "../types/task";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Layout, Typography, Divider, Card, Button, message } from "antd";
import {
  getAllTasks,
  createOrUpdateTask,
  deleteTask,
  runTaskExecution,
  searchTasksByName,
} from "../api/taskApi";
import { useEffect, useState } from "react";

const { Title } = Typography;
const { Content } = Layout;

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false); // toggle form

  const fetchTasks = async () => {
    setTasks(await getAllTasks());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (task: Task) => {
    await createOrUpdateTask(task);
    message.success("Task saved!");
    setShowForm(false); // hide form after submit
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    message.success("Task deleted!");
    fetchTasks();
  };

  const handleRun = async (task: Task) => {
    try {
      await runTaskExecution(task.id);
      message.success(`Task "${task.name}" executed!`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      message.error("Failed to run task.");
    }
  };

  const handleSearch = async (name: string) => {
    setTasks(await searchTasksByName(name));
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ maxWidth: 1000, margin: "0 auto", padding: "24px" }}>
        <Card
          style={{
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            background: "#ffffff",
          }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
            Task Manager Dashboard
          </Title>

          <Divider />

          {/* Create Task Button */}
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Close Form" : "Create Task"}
          </Button>

          {/* Conditional Form */}
          {showForm && (
            <Card
              style={{
                marginBottom: 24,
                padding: 16,
                borderRadius: 8,
                background: "#fafafa",
              }}
            >
              <Title level={4}>Create / Update Task</Title>
              <TaskForm onSubmit={handleCreateOrUpdate} />
            </Card>
          )}

          {/* Tasks List */}
          <Card style={{ padding: 16, borderRadius: 8, background: "#fafafa" }}>
            <Title level={4}>Tasks List</Title>
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onRun={handleRun}
              onSearch={handleSearch}
            />
          </Card>
        </Card>
      </Content>
    </Layout>
  );
};

export default HomePage;
