<script>
	import Header from "./components/Header.svelte";
	import Dropper from "./components/Dropper.svelte";
	import TransferProgress from "./components/TransferProgress.svelte"

	import state from "./helpers/store.js";

	export let transfer;

	const unsubscribe = state.subscribe(value => {
		transfer = value;
		console.log(transfer);
    });
</script>

{#if transfer == null}
	<Header />
	<Dropper />
{:else}
	<TransferProgress transfer="{transfer}"/>
{/if}