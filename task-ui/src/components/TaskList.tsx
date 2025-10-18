import { Table, Button, Input } from "antd";
import { useState } from "react";
import { Task } from "../types/task";
import TaskExecution from "./TaskExecution";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onRun: (task: Task) => void;
  onSearch: (name: string) => void;
}

const TaskList = ({ tasks, onDelete, onRun, onSearch }: Props) => {
  const [visibleExecution, setVisibleExecution] = useState<string | null>(null);

  return (
    <>
      <Input.Search
        placeholder="Search tasks..."
        onSearch={onSearch}
        style={{ marginBottom: 16 }}
      />

      <Table
        dataSource={tasks}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Name", dataIndex: "name" },
          { title: "Owner", dataIndex: "owner" },
          { title: "Command", dataIndex: "command" },
          {
            title: "Actions",
            render: (_, record) => (
              <>
                <Button
                  type="link"
                  onClick={() => {
                    onRun(record);
                    setVisibleExecution(record.id); // show latest execution
                  }}
                >
                  Run
                </Button>
                <Button type="link" danger onClick={() => onDelete(record.id)}>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
        pagination={false}
      />

      {tasks.map((task) => {
        const latestExecution =
          task.taskExecutions && task.taskExecutions.length > 0
            ? task.taskExecutions[task.taskExecutions.length - 1]
            : null;

        return (
          <div key={task.id} style={{ marginTop: 16 }}>
            {latestExecution && visibleExecution === task.id && (
              <TaskExecution
                execution={latestExecution}
                onClose={() => setVisibleExecution(null)}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default TaskList;
