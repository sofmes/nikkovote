<script lang="ts">
    import VoteBox from "$lib/components/VoteBox.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    if (data.characters) {
        data.characters.sort((a, b) => {
            if (a.votes.length > b.votes.length) return -1;
            if (a.votes.length < b.votes.length) return 1;
            return 0;
        });
    }

    async function addVote(characterId: number, comment: string | null) {
        const vote = { characterId, comment };
        await fetch(`/api/voteBox/${data.id}`, {
            method: "POST",
            body: JSON.stringify(vote)
        });
    }
</script>

{#if data.characters}
    {#each data.characters as character}
        <VoteBox
            name={character.name}
            thumbnailUrl={character.thumbnailUrl}
            votes={character.votes}
            addVote={(comment) => addVote(character.id, comment || null)}
        />
    {/each}
{:else}
    <p>⚠️ データが見つかりませんでした。</p>
{/if}
