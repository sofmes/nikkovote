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
    <img src={thumbnailUrl} alt="{name}のイラスト" class="img" />

    <div class="comments">
        {#key count}
            {#each votes.filter((v) => v.comment != null) as vote}
                <div
                    class="comment"
                    style:top="{Math.floor(Math.random() * 68) + 10}%"
                    style:animation-duration="{5 + Math.random() * 10}s;"
                >
                    {vote.comment}
                </div>
            {/each}
        {/key}
    </div>

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
        max-height: 70vh;
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
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 2;
    }

    .comment {
        position: absolute;
        color: black;
        font-size: 25px;
        padding: 5px;
        white-space: nowrap;
        z-index: 10;
        animation: flow linear infinite;
        animation-duration: 4s;
    }

    @keyframes flow {
        from {
            transform: translateX(400%);
        }
        to {
            transform: translateX(-100%);
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
