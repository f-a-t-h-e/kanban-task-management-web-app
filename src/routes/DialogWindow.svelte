<script lang="ts">
  import { boardsStore, currentBoard, dialogWindowStore } from "$lib/store";

  let isTaskOptionsOpen = false;
  function closeTaskOptions() {
    isTaskOptionsOpen = false;
  }
</script>

{#if $dialogWindowStore.isOpen}
  <div
    role="presentation"
    class="bg-black/50 w-full h-full top-0 left-0 fixed flex items-center justify-center z-50"
    on:click={(e) => {
      e.stopPropagation();
      e.preventDefault();
      dialogWindowStore.back();
    }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="max-h-full max-w-full bg-base-100 p-8 rounded-md w-[30rem] overflow-auto"
      on:click={(e) => {
        e.stopPropagation();
      }}
    >
      {#if $dialogWindowStore.option === "add-board"}
        <h3 class="text-accent font-bold mb-8 text-2xl">Add new board</h3>
        <div class="flex flex-col">
          <label for="add-board-name" class="text-accent text-sm mb-2"
            >Board Name</label
          >
          <input
            type="text"
            id="add-board-name"
            name="add-board-name"
            class="bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
            invalid:border-red-500"
            required
            placeholder="e.g. Web Design"
            on:change={(e) => {
              dialogWindowStore.update((c) => {
                if (c.isOpen && c.option == "add-board") {
                  c.board.name = e.currentTarget.value;
                }
                return c;
              });
            }}
          />

          <div>
            <span class="text-sm text-accent font-bold block mb-2 mt-6"
              >Board Columns</span
            >

            <ul class="flex flex-col gap-2">
              {#each $dialogWindowStore.board.columns as column, i}
                <li class="flex items-center gap-4">
                  <input
                    type="text"
                    value={column.name}
                    class="grow bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
                    invalid:border-red-500"
                    required
                    on:change={(e) => {
                      dialogWindowStore.update((c) => {
                        if (c.isOpen && c.option == "add-board") {
                          c.board.columns[i].name = e.currentTarget.value;
                        }
                        return c;
                      });
                    }}
                  />
                  <button
                    class="text-secondary hover:text-accent text-2xl"
                    on:click={() => {
                      dialogWindowStore.update((c) => {
                        if (c.isOpen && c.option == "add-board") {
                          c.board.columns = c.board.columns.filter(
                            (col) => col.id !== column.id
                          );
                        }
                        return c;
                      });
                    }}
                    ><svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 384 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      ></path></svg
                    ></button
                  >
                </li>
              {/each}
            </ul>
            <button
              class="p-2 px-4 font-bold text-center bg-accent text-base-100 rounded-full w-full mt-4 border border-accent hover:bg-transparent hover:border-primary transition-colors hover:text-primary"
              on:click={() => {
                dialogWindowStore.update((c) => {
                  if (c.isOpen && c.option == "add-board") {
                    c.board.columns.push({
                      id: "c_" + boardsStore.getNewId("column"),
                      name: "",
                      tasks: [],
                    });
                  }
                  return c;
                });
              }}>+ Add New Column</button
            >
          </div>
        </div>

        <!-- Save Or Cancel -->
        <div class="flex text-sm mt-8 gap-4">
          <button
            class="py-2 grow rounded-full bg-primary text-white hover:bg-primary/90 disabled:bg-secondary/75"
            on:click={() => {
              if (
                $dialogWindowStore.isOpen &&
                $dialogWindowStore.option === "add-board"
              ) {
                boardsStore.addBoard($dialogWindowStore.board);
                dialogWindowStore.close();
              }
            }}
            disabled={!$dialogWindowStore.board.name || !!$dialogWindowStore.board.columns.find(col=>!col.name)}
            >Save</button
          >
          <button
            class="py-2 grow rounded-full bg-white text-primary hover:bg-gray-200"
            on:click={() => {
              dialogWindowStore.back();
            }}>Cancel</button
          >
        </div>
        {:else if $dialogWindowStore.option === "edit-board"}
        <!-- EditBoard -->
        <h3 class="text-accent font-bold mb-8 text-2xl">Edit board</h3>
        <div class="flex flex-col">
          <label for="add-board-name" class="text-accent text-sm mb-2"
            >Board Name</label
          >
          <input
            type="text"
            id="add-board-name"
            name="add-board-name"
            class="bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
            invalid:border-red-500"
            required
            placeholder="e.g. Web Design"
            value={$dialogWindowStore.board.name}
            on:change={(e) => {
              dialogWindowStore.update((c) => {
                if (c.isOpen && c.option == "edit-board") {
                  c.board.name = e.currentTarget.value;
                }
                return c;
              });
            }}
          />

          <div>
            <span class="text-sm text-accent font-bold block mb-2 mt-6"
              >Board Columns</span
            >

            <ul class="flex flex-col gap-2">
              {#each $dialogWindowStore.board.columns as column, i}
                <li class="flex items-center gap-4">
                  <input
                    type="text"
                    value={column.name}
                    class="grow bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent cursor-pointer focus:cursor-text
                    invalid:border-red-500"
                    required
                    minlength="1"
                    on:change={(e) => {
                      dialogWindowStore.update((c) => {
                        if (c.isOpen && c.option == "edit-board") {
                          c.board.columns[i].name = e.currentTarget.value;
                        }
                        return c;
                      });
                    }}
                  />
                  <button
                    class="text-secondary hover:text-accent text-2xl"
                    on:click={() => {
                      dialogWindowStore.update((c) => {
                        if (c.isOpen && c.option == "edit-board") {
                          c.board.columns = c.board.columns.filter(
                            (col) => col.id !== column.id
                          );
                        }
                        return c;
                      });
                    }}
                    ><svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 384 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      ></path></svg
                    ></button
                  >
                </li>
              {/each}
            </ul>
            <button
              class="p-2 px-4 font-bold text-center bg-accent text-base-100 rounded-full w-full mt-4 border border-accent hover:bg-transparent hover:border-primary transition-colors hover:text-primary"
              on:click={() => {
                dialogWindowStore.update((c) => {
                  if (c.isOpen && c.option == "edit-board") {
                    c.board.columns.push({
                      id: "c_" + boardsStore.getNewId("column"),
                      name: "",
                      tasks: [],
                    });
                  }
                  return c;
                });
              }}>+ Add New Column</button
            >
          </div>
        </div>

        <!-- Save Or Cancel -->
        <div class="flex text-sm mt-8 gap-4">
          <button
            class="py-2 grow rounded-full bg-primary text-white hover:bg-primary/90 disabled:bg-secondary/75"
            on:click={() => {
              if (
                $dialogWindowStore.isOpen &&
                $dialogWindowStore.option === "edit-board"
              ) {
                boardsStore.putBoard($dialogWindowStore.board);
                dialogWindowStore.close();
              }
            }}
            disabled={!$dialogWindowStore.board.name || !!$dialogWindowStore.board.columns.find(col=>!col.name)}
            >Save</button
          >
          <button
            class="py-2 grow rounded-full bg-white text-primary hover:bg-gray-200"
            on:click={() => {
              dialogWindowStore.close();
              
            }}>Cancel</button
          >
        </div>

      {:else if $currentBoard}
        <!-- Delete Board -->
        {#if $dialogWindowStore.option === "delete-board"}
          <h3 class="text-red-500 font-bold mb-8">Delete this board?</h3>
          <p class="text-secondary text-sm">
            Are you sure you want to delete the "{$dialogWindowStore.board
              .name}" board? This action will remove all columns and tasks and
            cannot be reversed.
          </p>
          <div class="flex text-sm mt-8 gap-4">
            <button
              class="py-2 grow rounded-full bg-red-500 text-white hover:bg-red-600"
              on:click={() => {
                if (
                  $dialogWindowStore.isOpen &&
                  $dialogWindowStore.option === "delete-board"
                ) {
                  boardsStore.deleteBoard($dialogWindowStore.board.id);
                  dialogWindowStore.close();
                }
              }}>Delete</button
            >
            <button
              class="py-2 grow rounded-full bg-white text-primary hover:bg-gray-200"
              on:click={() => {
                dialogWindowStore.back();
              }}>Cancel</button
            >
          </div>
          <!-- Delete Task -->
        {:else if $dialogWindowStore.option === "delete-task"}
          <h3 class="text-red-500 font-bold mb-8">Delete this task?</h3>
          <p class="text-secondary text-sm">
            Are you sure you want to delete the "{$dialogWindowStore.task.name}"
            task and its subtasks? This action cannot be reversed.
          </p>
          <div class="flex text-sm mt-8 gap-4">
            <button
              class="py-2 grow rounded-full bg-red-500 text-white hover:bg-red-600"
              on:click={() => {
                if (
                  $dialogWindowStore.isOpen &&
                  $dialogWindowStore.option === "delete-task"
                ) {
                  const colId = $dialogWindowStore.task.status.id;
                  const taskId = $dialogWindowStore.task.id;
                  currentBoard.update((c) => {
                    if (c) {
                      c.columns.find((col) => {
                        if (col.id === colId) {
                          col.tasks = col.tasks.filter((t) => t.id !== taskId);
                        }
                      });
                    }
                    return c;
                  });
                  dialogWindowStore.close();
                }
              }}>Delete</button
            >
            <button
              class="py-2 grow rounded-full bg-white text-primary hover:bg-gray-200"
              on:click={() => {
                dialogWindowStore.back();
              }}>Cancel</button
            >
          </div>

          <!-- views -->
        {:else if $dialogWindowStore.option === "view-task"}
          <header class="flex items-center mb-8">
            <h3 class="text-accent font-bold grow">
              {$dialogWindowStore.task.name}
            </h3>

            <div class="flex mx-4 relative">
              <button
                class="flex flex-col gap-1"
                on:mousedown={(e) => {
                  if (!isTaskOptionsOpen) {
                    e.stopPropagation();
                    e.preventDefault();
                    isTaskOptionsOpen = true;
                    document.addEventListener("mousedown", closeTaskOptions, {
                      once: true,
                    });
                  } else {
                  }
                }}
              >
                <span class="w-1 h-1 rounded-full block bg-secondary"></span>
                <span class="w-1 h-1 rounded-full block bg-secondary"></span>
                <span class="w-1 h-1 rounded-full block bg-secondary"></span>
              </button>
              {#if isTaskOptionsOpen}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                  class="absolute top-full end-full bg-base-100 border border-neutral rounded-md text-nowrap flex flex-col"
                  on:mousedown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <button
                    class="text-secondary text-start hover:bg-primary/10 w-full p-2 rounded-t-md"
                    on:click={() => {
                      if (
                        $currentBoard &&
                        $dialogWindowStore.isOpen &&
                        $dialogWindowStore.option === "view-task"
                      ) {
                        isTaskOptionsOpen = false;
                        document.removeEventListener(
                          "mousedown",
                          closeTaskOptions
                        );
                        dialogWindowStore.open({
                          isOpen: true,
                          option: "edit-task",
                          task: {...$dialogWindowStore.task},
                          stack: {
                            option: "view-task",
                            oldTask: {...$dialogWindowStore.task}
                          },
                        });
                      }
                    }}>Edit task</button
                  >
                  <button
                    class="text-red-500 text-start hover:bg-primary/10 w-full p-2 rounded-b-md"
                    on:click={() => {
                      if (
                        $currentBoard &&
                        $dialogWindowStore.isOpen &&
                        $dialogWindowStore.option === "view-task"
                      ) {
                        isTaskOptionsOpen = false;
                        document.removeEventListener(
                          "mousedown",
                          closeTaskOptions
                        );
                        dialogWindowStore.open({
                          isOpen: true,
                          option: "delete-task",
                          task: {...$dialogWindowStore.task},
                          stack: {
                            option: "view-task",
                          },
                        });
                      }
                    }}>Delete task</button
                  >
                </div>
              {/if}
            </div>
          </header>

          <p class="text-sm text-secondary mb-8">
            {$dialogWindowStore.task.description}
          </p>

          <span class="block text-sm font-semibold text-secondary mb-4"
            >Subtasks ({$dialogWindowStore.task.subtasks.filter(
              (s) => s.done === true
            ).length} of {$dialogWindowStore.task.subtasks.length})</span
          >
          <div class="flex flex-col gap-2 mb-8">
            {#each $dialogWindowStore.task.subtasks as subtask, i}
              <div
                class="bg-neutral py-2 px-3 rounded accent-primary flex items-center gap-4"
              >
                <input
                  type="checkbox"
                  class="cursor-pointer w-4 h-4"
                  checked={subtask.done}
                  on:change={(e) => {
                    dialogWindowStore.update((c) => {
                      if (c.isOpen && c.option === "view-task") {
                        c.task.subtasks[i].done = e.currentTarget.checked;
                        currentBoard.update((cur) => {
                          cur?.columns.find((col) =>
                            col.tasks.find((t, j) => {
                              if (t.id === c.task.id) {
                                col.tasks[j] = c.task;
                                return true;
                              }
                              return false;
                            })
                          );
                          return cur;
                        });
                      }
                      return c;
                    });
                  }}
                />
                <p
                  class="text-sm {subtask.done
                    ? 'text-secondary line-through'
                    : 'text-accent'}"
                >
                  {subtask.name}
                </p>
              </div>
            {/each}
          </div>

          <!-- Status -->
          <div class="">
            <span class="text-sm text-accent font-bold block mb-2"
              >Current Status</span
            >
            <div
              class="relative [&:focus>label]:border-primary [&:focus-within>label]:border-primary"
            >
              <label
                tabindex="-1"
                for="task-status-toggle"
                class="cursor-pointer border border-secondary rounded-md flex items-center w-full py-2 px-4 justify-between"
              >
                <span class="text-accent"
                  >{$dialogWindowStore.task.status.name}</span
                >
                <span class="text-primary">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"
                    ></path></svg
                  >
                </span>
              </label>
              <input
                class="peer"
                type="checkbox"
                name="task-status-toggle"
                id="task-status-toggle"
                hidden
              />
              <ul
                class="absolute peer-checked:flex hidden flex-col top-full left-0 bg-neutral w-full text-secondary rounded-md"
              >
                {#each $currentBoard.columns as column, ci}
                  <li
                    class={column.id === $dialogWindowStore.task.status.id
                      ? "bg-primary/30"
                      : ""}
                  >
                    <button
                      class="text-xs px-4 py-2 hover:bg-primary/15 w-full text-start rounded-md"
                      on:click={(e) => {
                        dialogWindowStore.update((c) => {
                          if (c.isOpen && c.option === "view-task") {
                            if ($currentBoard) {
                              const colIndex = $currentBoard.columns.findIndex(
                                (col) => col.id === c.task.status.id
                              );
                              if (colIndex >= 0) {
                                const taskIndex = $currentBoard.columns[
                                  colIndex
                                ].tasks.findIndex((t) => t.id === c.task.id);
                                if (taskIndex >= 0) {
                                  currentBoard.handleUpdate(
                                    `${colIndex}_${taskIndex}`,
                                    ci.toString()
                                  );
                                }
                              }
                            }
                            c.task.status = {
                              id: column.id,
                              name: column.name,
                            };
                          }
                          return c;
                        });
                      }}
                    >
                      {column.name}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
          <!-- Edit Task -->
        {:else if $dialogWindowStore.option === "edit-task"}
          <h3 class="text-accent font-bold grow mb-8">Edit Task</h3>

          <!-- Editing fields -->
          <div class="flex flex-col">
            <label for="edit-task-name" class="text-accent text-sm mb-2"
              >Task Name</label
            >
            <input
              type="text"
              id="edit-task-name"
              name="edit-task-name"
              class="bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
              invalid:border-red-500"
              required
              placeholder="e.g. Take coffee break"
              value={$dialogWindowStore.task.name}
              on:change={(e) => {
                dialogWindowStore.update((c) => {
                  if (c.isOpen && c.option == "edit-task") {
                    c.task.name = e.currentTarget.value;
                  }
                  return c;
                });
              }}
            />

            <label
              for="edit-task-description"
              class="text-accent text-sm mb-2 mt-4">Task Description</label
            >
            <textarea
              id="edit-task-description"
              name="edit-task-description"
              class="bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
          resize-y"
              placeholder="e.g. It's always good to take a break. This  15 minute break will  recharge the batteries  a little."
              rows={Math.ceil($dialogWindowStore.task.description.length / 60) >
              4
                ? Math.ceil($dialogWindowStore.task.description.length / 60)
                : 4}
              value={$dialogWindowStore.task.description}
              on:change={(e) => {
                dialogWindowStore.update((c) => {
                  if (c.isOpen && c.option == "edit-task") {
                    c.task.description = e.currentTarget.value;
                  }
                  return c;
                });
              }}
            />
          </div>
          <!-- Subtasks -->
          <div>
            <span class="text-sm text-accent font-bold block mb-2 mt-6"
              >Subtasks</span
            >
            <ul class="flex flex-col gap-2">
              {#each $dialogWindowStore.task.subtasks as subtask, i}
                <li class="flex items-center gap-4">
                  <input
                    type="text"
                    value={subtask.name}
                    class="grow bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
                    invalid:border-red-500"
                    required
                    on:change={(e) => {
                      dialogWindowStore.update((c) => {
                        if (c.isOpen && c.option == "edit-task") {
                          c.task.subtasks[i].name = e.currentTarget.value;
                        }
                        return c;
                      });
                    }}
                  />
                  <button
                    class="text-secondary hover:text-accent text-2xl"
                    on:click={() => {
                      dialogWindowStore.update((c) => {
                        if (c.isOpen && c.option == "edit-task") {
                          c.task.subtasks = c.task.subtasks.filter(
                            (st) => st.id !== subtask.id
                          );
                        }
                        return c;
                      });
                    }}
                    ><svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 384 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      ></path></svg
                    ></button
                  >
                </li>
              {/each}
            </ul>
            <button
              class="p-2 px-4 font-bold text-center bg-accent text-base-100 rounded-full w-full mt-4 border border-accent hover:bg-transparent hover:border-primary transition-colors hover:text-primary"
              on:click={() => {
                dialogWindowStore.update((c) => {
                  if (c.isOpen && c.option == "edit-task") {
                    c.task.subtasks.push({
                      id: boardsStore.getNewId("subtask"),
                      done: false,
                      name: "",
                    });
                  }
                  return c;
                });
              }}>+ Add New Subtask</button
            >
          </div>

          <!-- Status -->
          <div class="">
            <span class="text-sm text-accent font-bold block mb-2 mt-6"
              >Current Status</span
            >
            <div
              class="relative [&:focus>label]:border-primary [&:focus-within>label]:border-primary"
            >
              <label
                tabindex="-1"
                for="task-status-toggle"
                class="cursor-pointer border border-secondary rounded-md flex items-center w-full py-2 px-4 justify-between"
              >
                <span class="text-accent"
                  >{$dialogWindowStore.task.status.name}</span
                >
                <span class="text-primary">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"
                    ></path></svg
                  >
                </span>
              </label>
              <input
                class="peer"
                type="checkbox"
                name="task-status-toggle"
                id="task-status-toggle"
                hidden
              />
              <ul
                class="absolute peer-checked:flex hidden flex-col top-full left-0 bg-neutral w-full text-secondary rounded-md"
              >
                {#each $currentBoard.columns as column, ci}
                  <li
                    class={column.id === $dialogWindowStore.task.status.id
                      ? "bg-primary/30"
                      : ""}
                  >
                    <button
                      class="text-xs px-4 py-2 hover:bg-primary/15 w-full text-start rounded-md"
                      on:click={(e) => {
                        dialogWindowStore.update((c) => {
                          if (c.isOpen && c.option === "edit-task") {
                            if ($currentBoard) {
                              const colIndex = $currentBoard.columns.findIndex(
                                (col) => col.id === c.task.status.id
                              );
                              if (colIndex >= 0) {
                                const taskIndex = $currentBoard.columns[
                                  colIndex
                                ].tasks.findIndex((t) => t.id === c.task.id);
                                if (taskIndex >= 0) {
                                  currentBoard.handleUpdate(
                                    `${colIndex}_${taskIndex}`,
                                    ci.toString()
                                  );
                                }
                              }
                            }
                            c.task.status = {
                              id: column.id,
                              name: column.name,
                            };
                          }
                          return c;
                        });
                      }}
                    >
                      {column.name}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <!-- Save Or Cancel -->
          <div class="flex text-sm mt-8 gap-4">
            <button
              class="py-2 grow rounded-full bg-primary text-white hover:bg-primary/90 disabled:bg-secondary/75"
              on:click={() => {
                if (
                  $dialogWindowStore.isOpen &&
                  $dialogWindowStore.option === "edit-task"
                ) {
                  const modifiedTask = $dialogWindowStore.task;
                  currentBoard.update((cur) => {
                    cur?.columns.find((col) =>
                      col.tasks.find((t, j) => {
                        if (t.id === modifiedTask.id) {
                          col.tasks[j] = { ...modifiedTask };
                          dialogWindowStore.back(true);
                          return true;
                        }
                        return false;
                      })
                    );
                    return cur;
                  });
                }
              }}
              disabled={!$dialogWindowStore.task.name || !!$dialogWindowStore.task.subtasks.find(st=>!st.name)}
              >Save</button
            >
            <button
              class="py-2 grow rounded-full bg-white text-primary hover:bg-gray-200"
              on:click={() => {
                dialogWindowStore.back();
              }}>Cancel</button
            >
          </div>
          {:else if $dialogWindowStore.option === "add-task"}
          <h3 class="text-accent font-bold grow mb-8">Add New Task</h3>

          <!-- Editing fields -->
          <div class="flex flex-col">
            <label for="edit-task-name" class="text-accent text-sm mb-2"
              >Task Name</label
            >
            <input
              type="text"
              id="edit-task-name"
              name="edit-task-name"
              class="bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
              invalid:border-red-500"
              required
              placeholder="e.g. Take coffee break"
              on:change={(e) => {
                dialogWindowStore.update((c) => {
                  if (c.isOpen && c.option == "add-task") {
                    c.task.name = e.currentTarget.value;
                  }
                  return c;
                });
              }}
            />

            <label
              for="edit-task-description"
              class="text-accent text-sm mb-2 mt-4">Task Description</label
            >
            <textarea
              id="edit-task-description"
              name="edit-task-description"
              class="bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
          resize-y"
              rows={4}
              placeholder="e.g. It's always good to take a break. This  15 minute break will  recharge the batteries  a little."
              on:change={(e) => {
                dialogWindowStore.update((c) => {
                  if (c.isOpen && c.option == "add-task") {
                    c.task.description = e.currentTarget.value;
                  }
                  return c;
                });
              }}
            />
          </div>
          <!-- Subtasks -->
          <div>
            <span class="text-sm text-accent font-bold block mb-2 mt-6"
              >Subtasks</span
            >
            <ul class="flex flex-col gap-2">
              {#each $dialogWindowStore.task.subtasks as subtask, i}
                <li class="flex items-center gap-4">
                  <input
                    type="text"
                    value={subtask.name}
                    class="grow bg-transparent px-4 py-2 border border-secondary outline-none text-accent rounded-md focus:border-accent
                    invalid:border-red-500"
                    required
                    on:change={(e) => {
                      dialogWindowStore.update((c) => {
                        if (c.isOpen && c.option == "add-task") {
                          c.task.subtasks[i].name = e.currentTarget.value;
                        }
                        return c;
                      });
                    }}
                  />
                  <button
                    class="text-secondary hover:text-accent text-2xl"
                    on:click={() => {
                      dialogWindowStore.update((c) => {
                        if (c.isOpen && c.option == "add-task") {
                          c.task.subtasks = c.task.subtasks.filter(
                            (st) => st.id !== subtask.id
                          );
                        }
                        return c;
                      });
                    }}
                    ><svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 384 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      ></path></svg
                    ></button
                  >
                </li>
              {/each}
            </ul>
            <button
              class="p-2 px-4 font-bold text-center bg-accent text-base-100 rounded-full w-full mt-4 border border-accent hover:bg-transparent hover:border-primary transition-colors hover:text-primary"
              on:click={() => {
                dialogWindowStore.update((c) => {
                  if (c.isOpen && c.option == "add-task") {
                    c.task.subtasks.push({
                      id: boardsStore.getNewId("subtask"),
                      done: false,
                      name: "",
                    });
                  }
                  return c;
                });
              }}>+ Add New Subtask</button
            >
          </div>

          <!-- Status -->
          <div class="">
            <span class="text-sm text-accent font-bold block mb-2 mt-6"
              >Current Status</span
            >
            <div
              class="relative [&:focus>label]:border-primary [&:focus-within>label]:border-primary"
            >
              <label
                tabindex="-1"
                for="task-status-toggle"
                class="cursor-pointer border border-secondary rounded-md flex items-center w-full py-2 px-4 justify-between"
              >
                <span class="text-accent"
                  >{$dialogWindowStore.task.status.name}</span
                >
                <span class="text-primary">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"
                    ></path></svg
                  >
                </span>
              </label>
              <input
                class="peer"
                type="checkbox"
                name="task-status-toggle"
                id="task-status-toggle"
                hidden
              />
              <ul
                class="absolute peer-checked:flex hidden flex-col top-full left-0 bg-neutral w-full text-secondary rounded-md"
              >
                {#each $currentBoard.columns as column, ci}
                  <li
                    class={column.id === $dialogWindowStore.task.status.id
                      ? "bg-primary/30"
                      : ""}
                  >
                    <button
                      class="text-xs px-4 py-2 hover:bg-primary/15 w-full text-start rounded-md"
                      on:click={(e) => {
                        dialogWindowStore.update((c) => {
                          if (c.isOpen && c.option === "add-task") {
                            if ($currentBoard) {
                              const colIndex = $currentBoard.columns.findIndex(
                                (col) => col.id === c.task.status.id
                              );
                              if (colIndex >= 0) {
                                const taskIndex = $currentBoard.columns[
                                  colIndex
                                ].tasks.findIndex((t) => t.id === c.task.id);
                                if (taskIndex >= 0) {
                                  currentBoard.handleUpdate(
                                    `${colIndex}_${taskIndex}`,
                                    ci.toString()
                                  );
                                }
                              }
                            }
                            c.task.status = {
                              id: column.id,
                              name: column.name,
                            };
                          }
                          return c;
                        });
                      }}
                    >
                      {column.name}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <!-- Save Or Cancel -->
          <div class="flex text-sm mt-8 gap-4">
            <button
              class="py-2 grow rounded-full bg-primary text-white hover:bg-primary/90 disabled:bg-secondary/75"
              on:click={() => {
                if (
                  $dialogWindowStore.isOpen &&
                  $dialogWindowStore.option === "add-task"
                ) {
                  console.log("add");
                  
                  const newTask = $dialogWindowStore.task;
                  currentBoard.update((cur) => {
                    cur?.columns.find((col) =>{
                      if (col.id === newTask.status.id) {
                        col.tasks.push({...newTask});
                        dialogWindowStore.back();
                        return true;
                      }
                      return false;
                    }
                    );
                    return cur;
                  });
                }
              }}
              disabled={!$dialogWindowStore.task.name || !!$dialogWindowStore.task.subtasks.find(st=>!st.name)}
              >Save</button
            >
            
            <button
              class="py-2 grow rounded-full bg-white text-primary hover:bg-gray-200"
              on:click={() => {
                dialogWindowStore.back();
              }}>Cancel</button
            >
          </div>
        
        {/if}
      {/if}
    </div>
  </div>
{/if}
