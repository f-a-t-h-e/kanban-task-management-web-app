<script lang="ts">
  import { boardsStore, currentBoard, dialogWindowStore } from "$lib/store";
  import DragableCard from "./DragableCard.svelte";

  let divArea: HTMLDivElement;

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    divArea.style.cursor = "grabbing";
    divArea.style.userSelect = "none";

    pos = {
      left: e.currentTarget.scrollLeft,
      top: e.currentTarget.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e: MouseEvent) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    divArea.scrollTop = pos.top - dy;
    divArea.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    divArea.style.cursor = "grab";
    divArea.style.removeProperty("user-select");

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  // Start drag and drop

  let dragged: HTMLDivElement | null;
  let dropzoneId: string = "";
  let draggedId: string | null;
  function scaleDown(node: Element, { delay = 0, duration = 300 }) {
    const o = getComputedStyle(node).height;
    return {
      delay,
      duration,
      css: (t: number) => `height: calc(${t}*${o})`,
    };
  }
  let clearIdTimeout: any;
</script>

{#if $currentBoard}
  <div
    role="presentation"
    class="h-full w-full overflow-auto cursor-grab flex p-6 gap-4"
    bind:this={divArea}
    on:mousedown={mouseDownHandler}
    on:dragover={(e) => {
      clearIdTimeout = setTimeout(() => {
        if (dropzoneId) {
          dropzoneId = "";
        }
      }, 350);
    }}
    on:drop={(e) => {
      if (draggedId && dropzoneId) {
        currentBoard.handleUpdate(draggedId, dropzoneId);
      }
    }}
  >
    {#each $currentBoard.columns as column, ci}
      <div class="flex flex-col">
        <div class="mb-4">
          <span class="text-secondary text-base"
            >{column.name} <span class="font-semibold">{column.tasks.length}</span></span
          >
        </div>

        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="flex flex-col grow w-72"
          on:dragover={(e) => {
            clearTimeout(clearIdTimeout);
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {#each column.tasks as task, i}
            {#if dragged && dropzoneId === `${ci}_${i}`}
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <!-- in:scaleUp={{ duration: 300, i: `${ci}_${i}` }} -->
              <div
                out:scaleDown={{ duration: 300 }}
                data-scale-up="true"
                class="bg-base-100 transition-all duration-300 my-1"
                style="--local-h: {`${dragged.getBoundingClientRect().height}px`}; height: var(--local-h,100px)"
              ></div>
            {/if}
            <DragableCard
              {task}
              i={`${ci}_${i}`}
              bind:dragged
              bind:dropzoneId
              bind:draggedId
            />
          {/each}
          {#if dragged && dropzoneId === ci.toString()}
            <div
              out:scaleDown={{ duration: 300 }}
              data-scale-up="true"
              class="bg-base-100 transition-all duration-300 my-1"
              style="--local-h: {`${dragged.getBoundingClientRect().height}px`}; height: var(--local-h,100px)"
              on:dragleave={(e) => {
                dropzoneId = "";
              }}
            ></div>
          {/if}
          <div
            class="grow opacity-0"
            on:dragover={(e) => {
              dropzoneId = ci.toString();
            }}
          ></div>
        </div>
      </div>
    {/each}
    <div class="h-full w-72 rounded-md bg-base-100/20">
      <button
        class="h-full w-72 flex  border-base-100 border items-center justify-center hover:bg-primary/5 text-primary text-3xl font-semibold"
        on:mousedown={(e) => {
          // e.stopPropagation();
        }}
        on:click={(e) => {
          e.stopPropagation();
          // dialogWindowStore.open({
          //   isOpen: true,
          //   option: "add-column",
          //   column: {
          //     id: "c_" + boardsStore.getNewId("column"),
          //     name: "",
          //     tasks: []
          //   }
          // })
          if ($currentBoard) {
            dialogWindowStore.open({
              isOpen: true,
              option: "edit-board",
              board: {...$currentBoard},
            });
          }
        }}
      >
        + New Column
      </button>
    </div>
  </div>
{:else}
  <div class="grow flex items-center justify-center h-full">
    <p class="text-3xl text-secondary">Please select a board</p>
  </div>
{/if}

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
  [data-scale-up="true"] {
    animation: scale-up 0.3s ease-out forwards;
    animation-iteration-count: 1;
  }
  @keyframes scale-up {
    0% {
      height: 0px;
    }
    100% {
      height: var(--local-h);
    }
  }
</style>
