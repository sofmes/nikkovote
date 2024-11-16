<script lang="ts">
    import type { Vote } from "$lib/server/db";

    export let name: string;
    export let thumbnailUrl: string;
    export let votes: Vote[];
    export let addVote: (comment: string) => void;

    let count = votes.length;
    let comment = "";

    function confirmText() {
        votes.push({ comment });
        count += 1;
        console.log(count);
        addVote(comment);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            confirmText();
        }
    }
    // ここにテキスト確認のためのコードがあれば追加
</script>

<div class="container">
    <h1>{name}<span>{count}票</span></h1>

    <div
        class="mx-auto ralative img overflow-hidden"
        style:background-image="url({thumbnailUrl})"
        style:background-size="contain"
        style:background-repeat="no-repeat"
        style:background-position="center"
        style:padding="auto 0"
        style:height="60vh"
    >
        <div class="absolute top-0 left-0">あいうえお</div>
        {#key count}
            {#each votes.filter((v) => v.comment != null) as vote}
                <div
                    class="absolute comment"
                    style:top="{Math.floor(Math.random() * 100)}%"
                    style:animation-duration="{5 + Math.random() * 10}s"
                >
                    {vote.comment}
                </div>
            {/each}
        {/key}
    </div>

    <div class="comments"></div>

    <div class="group">
        <input
            type="text"
            bind:value={comment}
            placeholder="コメント（オプション）"
            on:keydown={handleKeyDown}
            class="text"
        />
        <button on:click={confirmText} class="kakutei">確定</button>
    </div>
</div>

<style>
    .container {
        position: relative;
        width: 80%;
        max-width: 600px;
        margin: 0 auto;
        text-align: left;
    }

    .img {
        border: 2px solid gray;
        margin: 0 auto;
        height: 60vh;
        width: auto;
        display: block;
        border-radius: 10px;
        position: relative;
        z-index: 1;
    }

    .comments {
        position: absolute;
        top: 0;
        left: 0;
        width: auto;
        height: 60vh;
        pointer-events: none;
        overflow: hidden;
        z-index: 2;
    }

    .comment {
        font-size: 25px;
        z-index: 20;
        text-wrap: nowrap;
        animation: flow linear infinite;
        animation-duration: 2s;
    }

    @keyframes flow {
        from {
            left: 110%;
        }
        to {
            left: -10%;
        }
    }

    h1 {
        font-size: 2em;
    }

    .container span {
        float: right;
        text-align: right;
    }

    button {
        padding: 0.5em 1em;
        font-size: 1em;
        cursor: pointer;
    }

    .group {
        display: flex;
    }

    .text {
        border: 2px solid black;
        width: 90%;
        border-radius: 10px;
        height: 30px;
    }

    .kakutei {
        border: 2px solid black;
        font-weight: bold;
        border-radius: 10px;
        height: 30px;
        padding: 0 10px;
        white-space: nowrap;
    }
</style>
