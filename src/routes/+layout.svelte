<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { boardsStore, currentBoard, dialogWindowStore } from "$lib/store";
  import "../app.css";
  import DialogWindow from "./DialogWindow.svelte";
  export let data;
  $: currentBoardId = $page.url.searchParams.get("boardid");

  $: if (currentBoardId) {
    const targetBoard = $boardsStore.find((b) => b.id === currentBoardId);
    currentBoard.set(targetBoard || $boardsStore[0] || null);
  } else {
    currentBoard.set($boardsStore[0] || null);
  }
  $: if (browser) {
    let savedBoards = JSON.parse(localStorage.getItem("boards") || "null") as
      | Board[]
      | null;
    if (savedBoards) {
      $boardsStore = [...savedBoards];
      data.boards = [...savedBoards];
    } else {
      localStorage.setItem("boards", JSON.stringify(data.boards));
      $boardsStore = [...data.boards];
    }
  }

  let isBoardOptionsOpen = false;
  function closeBoardOptions() {
    isBoardOptionsOpen = false;
  }

  let showAside = true;

  // let minW:number;
  // let maxH:number;
  let theme="dark" as "dark"|"light";
</script>
<DialogWindow />
<!-- <svelte:window bind:innerHeight={maxH}></svelte:window> -->
<div class="h-screen flex flex-col">
  <header class="h-[3rem] bg-base-100 flex max-w-full border-b border-secondary"
  >
  <!-- bind:clientWidth={minW} -->
    <div
      class="flex text-accent w-[7rem] min-w-[7rem] md:w-[16.25rem] md:min-w-[16.25rem] text-xl font-black h-full items-center justify-start ps-1 gap-2"
    >
      <span class="text-primary text-xl"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1"></path></svg></span> <span> kanban </span>
    </div>
    <div class="text-accent ps-2 md:ps-4 text-lg h-full flex items-center font-bold grow">
      {#if $currentBoard}
        <span>
          {$currentBoard?.name}
        </span>
      {:else}
        <span class="text-secondary text-lg"> Select a board </span>
      {/if}

      <button class="md:hidden ms-auto grow h-full flex items-center justify-center text-xl"
      on:click={()=>{
        showAside = !showAside;
      }}>
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
      </button>
    </div>

    <div class="ms-auto flex h-full items-center">
      <button
        class="py-1 px-3 bg-primary text-white rounded-full text-xl font-semibold mx-2
        disabled:opacity-55 disabled:cursor-not-allowed"
        on:click={() => {
          if ($currentBoard) {
            dialogWindowStore.open({
              isOpen: true,
              option: "add-task",
              task: {
                id: "t_" + boardsStore.getNewId("task"),
                name: "",
                description: "",
                status: {
                  id: $currentBoard.columns[0].id,
                  name: $currentBoard.columns[0].name,
                },
                subtasks: [],
              },
            });
          }
        }}
        disabled={!$currentBoard?.columns.length}
      >
        <span class="text-2xl md:text-xl">+</span> <span class="hidden md:inline">Add New Task</span>
      </button>
      <div class="flex me-2 relative {$currentBoard ? '' : 'hidden'}">
        <button
          class="flex flex-col gap-1"
          on:mousedown={(e) => {
            if (!isBoardOptionsOpen) {
              e.stopPropagation();
              e.preventDefault();
              isBoardOptionsOpen = true;
              document.addEventListener("mousedown", closeBoardOptions, {
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
        {#if isBoardOptionsOpen}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="absolute top-full end-full bg-base-100 border border-neutral rounded-md text-nowrap flex flex-col min-w-fit w-32"
            on:mousedown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              class="text-secondary text-start hover:bg-primary/10 w-full p-2 rounded-t-md text-nowrap"
              on:click={() => {
                if ($currentBoard) {
                  isBoardOptionsOpen = false;
                  document.removeEventListener("mousedown", closeBoardOptions);
                  dialogWindowStore.open({
                    isOpen: true,
                    option: "edit-board",
                    board: { ...$currentBoard },
                  });
                }
              }}>Edit board</button
            >
            <button
              class="text-red-500 text-start hover:bg-primary/10 w-full p-2 rounded-b-md"
              on:click={() => {
                if ($currentBoard) {
                  isBoardOptionsOpen = false;
                  document.removeEventListener("mousedown", closeBoardOptions);
                  dialogWindowStore.open({
                    isOpen: true,
                    option: "delete-board",
                    board: { ...$currentBoard },
                  });
                }
              }}>Delete board</button
            >
          </div>
        {/if}
      </div>
    </div>
  </header>

  <div class="flex grow max-h-[calc(100%_-_3rem)]">
    <aside class="flex flex-col">
      {#if showAside}
        <div class="bg-base-100 min-w-[16.25rem] md:h-full overflow-auto md:border-e border-e-secondary
        fixed md:static max-w-full left-1/2 -translate-x-1/2 md:translate-x-0
        h-fit border md:border-0 rounded-md mt-4 md:mt-0 md:rounded-none
        z-[9] max-h-[calc(100vh_-_6rem)] md:max-h-full
        ">
          <div class="text-secondary ms-5 mb-7 mt-3">
            ALL BOARDS ({$boardsStore.length})
          </div>

          <ul class="pe-8">
            {#each $boardsStore as board}
              <li>
                <button
                  class="
                    flex items-center text-1xl gap-2 ps-5 w-60 py-4
                    cursor-pointer transition-all duration-500
                    hover:bg-primary/50 hover:text-primary hover:rounded-e-[5rem] hover:duration-300
                    {$currentBoard?.id === board.id
                    ? 'text-white bg-primary rounded-e-[5rem]'
                    : 'text-secondary rounded-e-none'}
          "
                  on:click={() => {
                    currentBoardId = board.id;
                    const urlParams = new URLSearchParams(
                      window.location.search
                    );
                    urlParams.set("boardid", board.id);
                    goto(`?${urlParams.toString()}`);
                  }}
                >
                  <span
                    ><svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path fill="none" d="M0 0h24v24H0z"></path><path
                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h6v14H5zm14 0h-6v-7h6v7zm0-9h-6V5h6v5z"
                      ></path></svg
                    ></span
                  > <span>{board.name}</span>
                </button>
              </li>
            {/each}
          </ul>
          <button
            class="flex items-center gap-2 text-primary font-bold
            mb-8
      text-1xl py-4 mt-4 mx-auto w-full justify-center
      cursor-pointer transition-all duration-500
      hover:bg-primary/50 hover:rounded-[5rem] hover:duration-300
      rounded-none"
            on:click={() => {
              dialogWindowStore.open({
                isOpen: true,
                option: "add-board",
                board: {
                  columns: [],
                  name: "",
                  id: "b_" + boardsStore.getNewId("board"),
                },
              });
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              ><path fill="none" d="M0 0h24v24H0z"></path><path
                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
              ></path></svg
            >
            <span> Create New Board </span>
          </button>
          <div class="bg-neutral rounded-md p-2 flex items-center justify-center text-2xl gap-2 mx-4 mb-16">
            <span class="text-secondary"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M234 26h44v92h-44zm0 368h44v92h-44zm104.025-251.143 65.054-65.054 31.113 31.113-65.054 65.054zM77.815 403.074l65.054-65.054 31.113 31.113-65.054 65.054zM394 234h92v44h-92zm-368 0h92v44H26zm312.029 135.14 31.112-31.113 65.054 65.054-31.112 31.112zM77.802 108.92l31.113-31.113 65.054 65.054-31.113 31.112zM256 358a102 102 0 1 1 102-102 102.12 102.12 0 0 1-102 102z"></path></svg></span>
            <button class="flex items-center h-7 w-16 rounded-full bg-primary relative"
            on:click={()=>{
              theme = theme == "dark" ? "light" : "dark";
              document.body.setAttribute("data-theme", theme);
            }}>
              <span class="absolute top-0 h-7 rounded-full w-7 bg-accent transition-all {theme == "dark" ? "start-full -translate-x-full" :"start-0 translate-x-0"}"></span>
            </button>
            <span class="text-secondary"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg></span>
          </div>
        </div>
      {/if}
      <button class="hidden md:flex items-center gap-4 bg-base-100 border border-neutral rounded-e-full py-4 px-8 text-xl text-secondary hover:text-accent fixed start-0 bottom-4 z-10"
      on:click={()=>{
        showAside = !showAside;
      }}
      >
        {#if showAside}
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 640 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
              ></path></svg
            >
          </span>
          <span>hide sidebar</span>
        {:else}
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 576 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
              ></path></svg
            >
          </span>
        {/if}
      </button>
    </aside>

    <main class="bg-neutral grow overflow-auto">
      <!-- {#if $currentBoard} -->
      <slot />
      <!-- {:else}
      <div class="grow flex items-center justify-center h-full">
        <p class="text-3xl text-secondary">Please select a board</p>
      </div>
      {/if} -->
    </main>
  </div>
</div>

<style></style>
