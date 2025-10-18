import { Card, Typography, Button } from "antd";
import { TaskExecution as Exec } from "../types/task";
import { CloseOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

interface Props {
  execution: Exec;
  onClose: () => void;
}

const TaskExecution = ({ execution, onClose }: Props) => {
  return (
    <Card
      style={{ marginBottom: 12, position: "relative" }}
      bodyStyle={{ paddingRight: 40 }}
    >
      {/* Close button */}
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={onClose}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          padding: 0,
          fontSize: 16,
        }}
      />

      <Text strong>Command: </Text>
      <Text>{execution.command}</Text>
      <br />
      <Text strong>Status: </Text>
      <Text>{execution.status}</Text>
      <br />
      <Text strong>Start: </Text>
      <Text>{execution.startTime}</Text>
      <br />
      <Text strong>End: </Text>
      <Text>{execution.endTime}</Text>
      <Paragraph>
        <Text strong>Output:</Text>
        <pre>{execution.output}</pre>
      </Paragraph>
    </Card>
  );
};

export default TaskExecution;
