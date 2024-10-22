<script lang="ts">
    export let name: string;
    export let imgsrc: string;
    export let comments: string[]; // コメントを受け取るプロパティ

    let count = 0;
    
    function increment() {
        count += 1;
    }

    let tempText = "";
    let confirmedText = "";
  
    function confirmText() {
        confirmedText = tempText;
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
    <img src={imgsrc} alt="{name}のイラスト" class="img" />
    
    <div class="comments">
        {#each comments as comment (comment)}
            <div class="comment" style="top: {Math.floor(Math.random() * 65) + 10}%; animation-duration: {5 + Math.random() * 10}s;">
                {comment}
            </div>
        {/each}
</div>

    <p class="bs"><button on:click={increment} class="frame">このキャラに投票する</button></p>

    <div class="group">
        <input type="text" bind:value={tempText} placeholder="コメントを入力してください" on:keydown={handleKeyDown} class="text">
        <button on:click={confirmText} class="kakutei">確定</button>
    </div>
    <p>コメント: {confirmedText}</p>
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
        max-width: 100%;
        height: auto;
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
        from { transform: translateX(400%); }
        to { transform: translateX(-100%); }
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

    .frame {
        border: 3px outset; 
        padding: 5px;
        border-radius: 20px;
        font-size: 15px;
        font-weight: bold;
        color: white;
        background-color: red;
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

    .bs {
        margin-bottom: 2px;
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
