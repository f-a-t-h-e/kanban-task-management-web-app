<script lang="ts">
  import { dialogWindowStore } from "$lib/store";

  export let i: string;
  export let dragged: HTMLDivElement | null;
  export let dropzoneId: string;
  export let draggedId: string | null;
  export let task: Task;
  let draggableEl: HTMLDivElement;
  let placeHolderEl: HTMLDivElement;
  let offsetX: number, offsetY: number;
  function dragstart(
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    dragged = draggableEl;
    draggedId = i;
    offsetX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    offsetY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    draggableEl.style.left = `${x}px`;
    draggableEl.style.top = `${y}px`;
    e.currentTarget.style.position = "fixed";
  }

  function drag(e: MouseEvent) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    draggableEl.style.left = `-1000px`;
    draggableEl.style.top = `-1000px`;
  }

  function dragend(e: MouseEvent) {
    dragged = null;
    draggedId = null;
    draggableEl.style.position = "";
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="py-2"
  on:dragenter={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  on:dragover={(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropzoneId !== i && dragged !== draggableEl) {
      dropzoneId = i;
    }
  }}
  on:dragleave={(e) => {}}
>
  {#if dragged && dragged === draggableEl}
    <div
      bind:this={placeHolderEl}
      class="bg-secondary/50 rotate-[2.5deg] w-72"
      style="height: {`${dragged.getBoundingClientRect().height}px`}"
    ></div>
  {/if}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="p-4 bg-base-100 rounded-md w-72 cursor-pointer [&:hover>h4]:text-primary"
    draggable="true"
    tabindex="-1"
    role="button"
    on:keypress={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        dialogWindowStore.open({
          isOpen: true,
          option: "view-task",
          task: {...task},
        });
      }
    }}
    on:click={(e) => {
      e.stopPropagation();
      e.preventDefault();
      dialogWindowStore.open({
        isOpen: true,
        option: "view-task",
        task: {...task},
      });
    }}
    bind:this={draggableEl}
    on:mousedown={(e) => {
      e.stopPropagation();
    }}
    on:dragstart={(e) => {
      e.stopPropagation();
      dragstart(e);
    }}
    on:drag={(e) => {
      drag(e);
    }}
    on:dragend={(e) => {
      dragend(e);
    }}
  >
    <h4 class="text-accent font-semibold">
      {task.name}
    </h4>
    <span class="block text-secondary text-sm font-semibold">
      {task.subtasks.filter((t) => t.done).length} of {task.subtasks.length} subtasks
    </span>
  </div>
</div>
