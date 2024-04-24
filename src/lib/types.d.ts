interface Task {
  name: string;
  description: string;
  subtasks: {
    name: string;
    done: boolean;
    id: string;
  }[];
  status: {
    id: string;
    name: string;
  };
  id: string;
}

interface Board {
  name: string;
  id: string;
  columns: Column[];
}
interface Column {
  name: string;
  tasks: Task[];
  id: string;
}
