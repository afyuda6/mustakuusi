<script lang="ts">
    import {Router, createRouter} from '@roxi/routify';
    import routes from '../.routify/routes.default.js';
    import Marquee from './components/Marquee/Marquee.svelte';
    import Footer from './components/Footer/Footer.svelte';
    import styles from './App.module.css';

    export const router = createRouter({routes});
</script>

<div class={styles.App}>
    <Marquee/>
    <Router {router}/>
    <Footer/>
</div>
