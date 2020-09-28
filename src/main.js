import App from './components/App.svelte';

const app = new App({
	target: document.body,
	props: {
		version: 'v0.1.0'
	}
});

export default app;