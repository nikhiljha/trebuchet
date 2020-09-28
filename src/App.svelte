<script>
	import Header from "./Header.svelte";
	import Dropper from "./Dropper.svelte";
	import TransferProgress from "./TransferProgress.svelte"

	import state from "./store.js";

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