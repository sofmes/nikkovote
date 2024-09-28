<script lang="ts">
    export let name: string;
    export let ranking: string[];
    export let thumbnailUrl: string;
</script>

<div class="border border-black rounded-md p-4 mx-60 my-20 justify-center">
    <h1 class="text-6xl text-center">{name}</h1>
    <div class="flex">
        <img
            src={thumbnailUrl}
            alt="{name}のイラスト"
            class="w-1/2 p-6"
        />
        <ul
            class="pl-4 text-4xl space-y-7 ranking flex flex-col justify-center"
        >
            {#each ranking as characterName}
                <li>{characterName}</li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .ranking {
        counter-reset: rank;
    }

    .ranking li::before {
        counter-increment: rank;
        content: counter(rank) "位";
        padding-right: 10px;
    }
</style>
