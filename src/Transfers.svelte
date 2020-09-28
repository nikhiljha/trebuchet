<script>
let transfers = [{"filename": "~/Documents/test.pdf", "filesize": "100MB", "status": "pre", "progress": "10MB", "code": "these-are-five-average-words"}];
</script>

<section class="transfers">
    {#if transfers.length > 0}
        <h4>Current Transfers</h4>
    {/if}
    {#each transfers as item, index}
    <span>{item.filename}</span>
        {#if item.status == "pre"}
            <span>{item.code}</span>
        {:else}
            <span>{item.filesize} {item.status} {item.progress}</span>
        {/if}
        <br/>
    {/each}
</section>

<style lang="scss">
    h4 {
        padding: 0;
        margin-block-end: 0;
    }
	.transfers {
		display: flex;
        justify-content: left;
        flex-direction: column;
        padding: 0 2rem 0 2rem;
	}
</style>