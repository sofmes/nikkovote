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
            <img
                src={character.thumbnailUrl}
                alt="{character.name}のイラスト"
            />
            {character.votes.length}票

            <form action="/api/voteBox/{data.id}" method="post">
                <input type="hidden" name="characterId" value={character.id} />
                <input
                    type="text"
                    name="comment"
                    placeholder="コメント欄（任意）"
                />
                <button type="submit">投票</button>
            </form>
        </div>
    {/each}
{:else}
    <p>⚠️ データが見つかりませんでした。</p>
{/if}
