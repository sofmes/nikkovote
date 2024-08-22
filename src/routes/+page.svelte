<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>ニッコニコ投票</title>
    <meta name="description" content="キャラクターに投票ができます。" />
</svelte:head>

{#if data}
    {#each data.voteBoxes as voteBox}
        <div>
            {voteBox.title}
            <img src={voteBox.thumbnailUrl} alt={voteBox.title} />
            <ul>
                {#each voteBox.ranking as characterName, i}
                    <li>{i + 1}位　{characterName}</li>
                {/each}
            </ul>
        </div>
    {/each}
{:else}
    <p>まだ投票ボックスがない。</p>
{/if}
