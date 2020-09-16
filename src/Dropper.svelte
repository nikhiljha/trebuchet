<script>
    const { dialog } = require('electron').remote;

    const uploadFile = () => {
        dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }).then((res) => {
            console.log(res);
        });
    }
</script>

<main>
	<button type="button" on:click={uploadFile}>Upload a File</button>
	<button type="button" onclick="alert('Hello world!')">Receive a File</button>
</main>

<style lang="scss">
	main {
		display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0 2rem 0 2rem;
	}
</style>