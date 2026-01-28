<script lang="ts">
    import {Router, createRouter} from '@roxi/routify';
    import routes from '../.routify/routes.default.js';
    import Marquee from './components/Marquee/Marquee.svelte';
    import styles from './App.module.css';

    export const router = createRouter({routes});
</script>

<div class={styles.App}>
    <Marquee/>
    <Router {router}/>
</div>
