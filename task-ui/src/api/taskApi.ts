import axios from "axios";
import { Task, TaskExecution } from "../types/task";

const API_URL = "http://localhost:8080/tasks";

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createOrUpdateTask = async (task: Task): Promise<Task> => {
  const res = await axios.put(API_URL, task);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const runTaskExecution = async (id: string, command?: string): Promise<TaskExecution> => {
  const res = await axios.put(`${API_URL}/${id}/executions`, { command });
  return res.data;
};

export const searchTasksByName = async (name: string): Promise<Task[]> => {
  const res = await axios.get(`${API_URL}/search?name=${name}`);
  return res.data;
};