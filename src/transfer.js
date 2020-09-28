const { spawn } = require( 'child_process' );
import state from './store.js';

// TODO: Don't hardcode this.
function get_croc_path() {
    return 'C:\\Users\\Nikhil\ Jha\\Downloads\\croc_8.3.2_Windows-64bit\\croc.exe';
}

export class OutgoingTransfer {
    constructor(filePath, callback) {
        this.filePath = filePath;
        this.code = null;
        this.fileSize = null;
        this.process = null;
        this.callback = callback;
        this.send();
    }

    send() {
        const croc = spawn(get_croc_path(), ["send", this.filePath], {"stdio": ['ignore', 'pipe', 'pipe']});
        this.process = croc;

        croc.stdout.on('data', data => console.log( `stdout: ${data}` ));
        croc.stderr.on('data', data => {
            const code_matches = data.toString().match(/(?<=Code is: )(.*)(?=\n)/g);
            const size_matches = data.toString().match(/(?<=Sending '(.*)' \()(.*)(?=\)\n)/g);
            if (code_matches && code_matches.length == 1) {
                this.code = code_matches[0];
            }
            if (size_matches && size_matches.length == 1) {
                this.fileSize = size_matches[0];
            }
            state.update(state => { return this });
            console.log(`stderr: ${data}`);
        });
        croc.on('close', code => {
            this.status = `post ${code}`;
            this.callback(this);
        });
    }
}

export class IncomingTransfer {
    constructor(code, cwd, callback) {
        if (!this.validate_code(code)) {
            callback(null);
        }
        this.code = code;
        this.cwd = cwd;
        this.filePath = null;
        this.fileSize = null;
        this.process = null;
        this.callback = callback;
        this.recv();
    }

    validate_code(code) {
        return /^[A-Za-z0-9-]+$/.test(code);
    }

    recv() {
        const croc = spawn(get_croc_path(), ["--yes", this.code], {"stdio": ['ignore', 'pipe', 'pipe'], "cwd": this.cwd});
        this.process = croc;

        //croc.stdout.on('data', data => console.log( `stdout: ${data}` ));
        croc.stderr.on('data', data => {
            const name_matches = data.toString().match(/(?<=Accept ')(.*)(?=')/g);
            const size_matches = data.toString().match(/(?<=Sending ' \()(.*)(?=\))/g);
            if (name_matches && name_matches.length == 1) {
                this.filePath = name_matches[0];
            }
            if (size_matches && size_matches.length == 1) {
                this.fileSize = size_matches[0];
            }
            state.update(state => { return this });
            console.log(`stderr: ${data}`);
        });
        croc.on('close', code => {
            console.log(`post ${code}`);
            this.callback(this);
        });
    }
}

