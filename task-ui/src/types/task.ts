export interface TaskExecution {
    command: string;
    status: string;
    output: string;
    startTime: string;
    endTime: string;
  }
  
  export interface Task {
    id: string;
    name: string;
    owner: string;
    command: string;
    taskExecutions: TaskExecution[];
  }