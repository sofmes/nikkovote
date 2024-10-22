<script lang="ts">
    import Counter from "./count.svelte";

    let characterComments = {
        "巴 マミ": Array.from({ length: 30 }, (_, i) => `巴 マミ コメント ${i + 1}`),//ここでバックエンドからコメントを受け取る
        "暁美 ほむら": Array.from({ length: 30 }, (_, i) => `暁美 ほむら コメント ${i + 1}`),
        "佐倉 杏子": Array.from({ length: 30 }, (_, i) => `佐倉 杏子 コメント ${i + 1}`),
        "美樹 さやか": Array.from({ length: 30 }, (_, i) => `美樹 さやか コメント ${i + 1}`),
        "鹿目 まどか": Array.from({ length: 30 }, (_, i) => `鹿目 まどか コメント ${i + 1}`)
    };
</script>

<main>
    <h1 class="subheader">まどマギかわいいキャラランキング</h1>
    <Counter name="巴 マミ" imgsrc="src/images/madomagiMami.jpg" comments={characterComments["巴 マミ"]} />
    <Counter name="暁美 ほむら" imgsrc="src/images/madomagiHomura.png" comments={characterComments["暁美 ほむら"]} />
    <Counter name="佐倉 杏子" imgsrc="src/images/madomagiKyouko.png" comments={characterComments["佐倉 杏子"]} />
    <Counter name="美樹 さやか" imgsrc="src/images/madomagiSayaka.png" comments={characterComments["美樹 さやか"]} />
    <Counter name="鹿目 まどか" imgsrc="src/images/madomagiMadoka.png" comments={characterComments["鹿目 まどか"]} />
</main>

<style>
    main {
        text-align: center;
        font-family: Arial, sans-serif;
    }

    .subheader {
        font-size: 37px;
        padding: 0 15px;
        border: solid black;
    }
</style>