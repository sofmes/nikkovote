<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    if (data.characters) {
        data.characters.sort((a, b) => {
            if (a.votes.length > b.votes.length) return -1;
            if (a.votes.length < b.votes.length) return 1;
            return 0;
        });
    }
</script>

{#if data.characters}
    {#each data.characters as character, i}
        <div>
            <header>{character.name} {i + 1}位</header>
            <img src={character.thumbnailUrl} alt="{character.name}のロゴ" />
            {character.votes}
        </div>
    {/each}
{:else}
    <p>⚠️ データが見つかりませんでした。</p>
{/if}
