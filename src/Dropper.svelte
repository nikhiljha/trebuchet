<script>
    const { dialog } = require("electron").remote;
    const prompt = require("electron-prompt");
    import { IncomingTransfer, OutgoingTransfer } from "./transfer.js";
    import state from "./store.js";

    export let temp = "";

    const callback = (obj) => {
        console.log("called back");
        state.update((current) => {
            return null;
        });
    };

    const uploadFile = () => {
        dialog.showOpenDialog({ properties: ["openFile"] }).then((res) => {
            if (res.filePaths[0] == null) return;
            console.log(`Got file: ${res.filePaths[0]}`);
            var transfer = new OutgoingTransfer(res.filePaths[0], callback);
            state.update((current) => {
                return transfer;
            });
        });
    };

    const downloadFile = () => {
        prompt({
            title: "Recieve a File",
            label: "Code",
            value: "asdf",
            inputAttrs: {
                type: "text",
            },
            type: "input",
        })
            .then((code) => {
                if (code === null) {
                    console.log("user cancelled");
                } else {
                    dialog
                        .showOpenDialog({ properties: ["openDirectory"] })
                        .then((res) => {
                            if (res.filePaths[0] == null) return;
                            console.log(`Got folder: ${res.filePaths[0]}`);
                            var transfer = new IncomingTransfer(
                                code,
                                res.filePaths[0],
                                callback
                            );
                            state.update((current) => {
                                return transfer;
                            });
                        });
                }
            })
            .catch(console.error);
    };
</script>

<style lang="scss">
    main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0 2rem 0 2rem;
    }
</style>

<main>
    <button type="button" on:click={uploadFile}>Upload a File</button>
    <button type="button" on:click={downloadFile}>Receive a File</button>
    <span>{temp}</span>
</main>
