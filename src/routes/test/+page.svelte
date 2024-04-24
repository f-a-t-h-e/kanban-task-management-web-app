<script>
    let a = [
        {
            id: 1,
            b: false,
        },
        {
            id: 2,
            b: false,
        },
        {
            id: 3,
            b: false,
        },
    ]
</script>
<div class="bg-red-200 w-full h-full p-4 z-40">
    {#each a as aa, i}
        <div class="p-4 text-white {aa.b ? "bg-red-600": "bg-slate-500"}"
        style="background-color: {aa.b ? "red": "green"};"
        >
            <input type="checkbox" on:change={(e)=>{
                a[i].b = e.currentTarget.checked;

            }}>
            aaaaaaaa
        </div>
    {/each}
</div>