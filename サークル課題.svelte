<script>
    // カウンターの状態を保持する変数
    let count = 0;

    // カウントアップする関数
    function increment() {
        count += 1;
    }
</script>

<style>
    /* 必要に応じてスタイルを追加 */
    button {
        padding: 10px 20px;
        font-size: 1.2em;
    }
</style>

<main>
    <h1>カウンター</h1>
    <p>現在のカウント: {count}</p>
    <!-- ボタンをクリックするとカウントアップ -->
    <button on:click={increment}>カウントアップ</button>
</main>
