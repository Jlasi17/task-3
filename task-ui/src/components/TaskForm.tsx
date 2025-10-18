import { Form, Input, Button } from "antd";
import { Task } from "../types/task";

interface Props {
  onSubmit: (task: Task) => void;
  initialValues?: Task;
}

const TaskForm = ({ onSubmit, initialValues }: Props) => {
  return (
    <Form
      initialValues={initialValues}
      onFinish={(values) => onSubmit(values as Task)}
      layout="vertical"
    >
      <Form.Item label="Task ID" name="id" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Owner" name="owner" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Command" name="command" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
