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

<div>
    <main class="border border-black rounded-md p-4 mx-60 my-20 justify-center">
        <h1 class="text-6xl text-center">まどまぎ かわいいキャラランキング</h1>
        <div class="flex ">
            <img src="src/800.jpg" alt="まどまぎのイラスト" class="w-1/2 p-6">  
            <ul class="pl-4 text-4xl space-y-7 ranking flex flex-col justify-center">
                <li>暁美ほむら</li>
                <li>佐倉杏子</li>
                <li>巴マミ</li>
                <li>鹿目まどか</li>
                <li>美樹さやか</li>
            </ul>
        </div>
    </main>
</div>

<div>
    <main class="border border-black rounded-md p-4 mx-60 my-20 justify-center">
        <h1 class="text-6xl text-center">ゼンゼロ 強いキャラランキング</h1>
        <div class="flex ">
            <img src="src\FXI2TJ_UUAAsArP.jpg" alt="まどまぎのイラスト" class="w-1/2 p-6">  
            <ul class="pl-4 text-4xl space-y-7 ranking flex flex-col justify-center">
                <li>猫又</li>
                <li>エレンジョー</li>
                <li>青衣</li>
                <li>アンビー</li>
                <li>ニコ</li>
            </ul>
        </div>
    </main>
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