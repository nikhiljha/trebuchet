<script>
    import state from "../helpers/store.js";
    import { IncomingTransfer, OutgoingTransfer } from '../helpers/transfer.js';

    export let transfer;

    function cancel() {
        if (transfer != null) {
            state.update((current) => {
                return null;
            });
            transfer.process.kill();
        }
    }
</script>

<main>
    {#if transfer instanceof OutgoingTransfer}
    <p>To send your file, give this code to someone else with Trebuchet.</p>
    <h2>{transfer.code}</h2>
    {:else}
    <p>Downloading {transfer.filePath} ({transfer.fileSize})...</p>
    {/if}
    <button on:click={cancel}>Cancel</button>
</main>

<style lang="scss">
	main {
		display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0 2rem 0 2rem;
	}

    h2 {
        margin-top: 0rem;
        margin-bottom: 1rem;
    }
</style>