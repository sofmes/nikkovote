<script lang="ts">
    import VoteBoxResult from "$lib/components/VoteBoxResult.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>ニッコニコ投票</title>
    <meta name="description" content="キャラクターに投票ができます。" />
</svelte:head>

{#if data && data.voteBoxes}
    {#each data.voteBoxes as voteBox}
        <VoteBoxResult
            link="/{voteBox.id}"
            name={voteBox.title}
            ranking={voteBox.ranking}
            thumbnailUrl={voteBox.thumbnailUrl}
        />
    {/each}
{:else}
    <p>まだ投票ボックスがない。</p>
{/if}
