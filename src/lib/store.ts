import { get, writable, type Updater } from "svelte/store";

function createCurrentBoard() {
  const { subscribe, set, update: u } = writable<Board | null>(null);
  function update(updater: Updater<Board | null>) {
    u(updater);
    const current = get(currentBoard);
    if (current) {
      let savedBoards = JSON.parse(localStorage.getItem("boards") || "null") as
        | Board[]
        | null;
      if (savedBoards) {
        savedBoards = savedBoards.map((b) => {
          if (b.id === current?.id) {
            return current;
          }
          return b;
        });
        localStorage.setItem("boards", JSON.stringify(savedBoards));
      }
    }
  }
  return {
    subscribe,
    set,
    update,
    handleUpdate: (fromId: string, toId: string) => {
      update((current) => {
        const fromCol = +fromId.split("_")[0];
        const fromTask = +fromId.split("_")[1];
        if (isNaN(fromCol + fromTask)) {
          return current;
        }
        const toCol = +toId.split("_")[0];
        const toTask = +toId.split("_")[1];
        if (isNaN(toCol + toTask) && toId.includes("_")) {
          return current;
        }
        if (current) {
          let targetTask = undefined as Task | undefined;
          current.columns[fromCol].tasks = current.columns[
            fromCol
          ].tasks.filter((t, i) => {
            if (i == fromTask) {
              targetTask = t;
              return false;
            }
            return true;
          });
          if (targetTask) {
            targetTask.status = {
              id: current.columns[toCol].id,
              name: current.columns[toCol].name,
            };
            if (toId.includes("_")) {
              current.columns[toCol].tasks.splice(toTask, 0, targetTask);
            } else {
              current.columns[toCol].tasks.push(targetTask);
            }
          }
        }
        return current;
      });
    },
  };
}

export const currentBoard = createCurrentBoard();

type CurrentDialog =
  | {
      isOpen: false;
    }
  | ({
      isOpen: true;
    } & (
      | {
          option: "delete-board";
          stack?: {
            option: "edit-board";
          };
          board: Board;
        }
      | {
          option: "edit-board";
          board: Board;
        }
      | {
          option: "delete-task";
          stack?: {
            option: "view-task";
          };
          task: Task;
        }
      | {
          option: "edit-task";
          stack?: {
            option: "view-task";
            oldTask: Task;
          };
          task: Task;
        }
      | {
          option: "view-task";
          task: Task;
        }
      | {
          option: "add-board";
          board: Board;
        }
      | {
          option: "add-task";
          task: Task;
        }
      // | {
      //     option: "add-column";
      //     column: Column;
      //   }
    ));
function createDialogWindow() {
  const { subscribe, set, update } = writable<CurrentDialog>({ isOpen: false });

  return {
    subscribe,
    // set:(this: void, value: CurrentDialog)=>{

    // },
    update: (updater: Updater<CurrentDialog>) => {
      update(updater);
    },
    open: (c: CurrentDialog) => {
      set(c);
    },
    close: () => {
      set({ isOpen: false });
    },
    back: (doIt?:boolean) => {
      update((current) => {
        if (current.isOpen) {
          if ((current as any).stack) {            
            if (!doIt && current.option === "edit-task") {
              current.task = {...current.stack!.oldTask}
            }
            current.option = (current as any).stack.option;
            delete (current as any).stack;
          } else {
            return {
              isOpen: false,
            };
          }
        }
        return current;
      });
    },
  };
}

export const dialogWindowStore = createDialogWindow();

function createBoardsStore() {
  const { set, update, subscribe } = writable<Board[]>([]);
  let defaultLastId = {
    board: 2,
    column: 7,
    task: 14,
    subtask: 31,
  };
  return {
    set,
    update,
    subscribe,
    getNewId: (IdFor: "board" | "column" | "task" | "subtask") => {
      const savedSet = JSON.parse(localStorage.getItem("lastId") || "null");
      if (savedSet) {
        savedSet[IdFor] = savedSet[IdFor] + 1;
        localStorage.setItem("lastId", JSON.stringify(savedSet));
        defaultLastId = savedSet;
        return savedSet[IdFor];
      } else {
        defaultLastId[IdFor] = defaultLastId[IdFor] + 1;
        localStorage.setItem("lastId", JSON.stringify(defaultLastId));
        return defaultLastId[IdFor];
      }
    },
    deleteBoard: (id: string) => {
      update((boards) => {
        boards = boards.filter((board) => board.id !== id);
        const currentBoardId = get(currentBoard)?.id;
        if (currentBoardId === id) {
          currentBoard.set(boards[0] || null);
        }
        localStorage.setItem("boards", JSON.stringify(boards));
        return boards;
      });
    },
    addBoard: (board: Board) => {
      update((boards) => {
        boards.push(board);
        if (!get(currentBoard)) {
          currentBoard.set(boards[0]);
        }
        localStorage.setItem("boards", JSON.stringify(boards));
        return boards;
      });
    },
    putBoard: (board: Board) => {
      update((boards) => {
        boards = boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          return b;
        });
        localStorage.setItem("boards", JSON.stringify(boards));
        return boards;
      });
    },
  };
}

export const boardsStore = createBoardsStore();
