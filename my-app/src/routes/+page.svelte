<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import Account from './components/Account.svelte';
    import Loading from './components/Loading.svelte';
    import { accounts } from './stores';

    let username = "";
    let password = "";
    let loading = false;

    $: loginBtn = Boolean(username && password);
    $: sortedAccount = $accounts.sort((a, b) => b.dateCreated - a.dateCreated);

    onMount(async() => {
        loading = true;
        const data = await fetch('/api/register');
        $accounts = await data.json();
        loading = false;
    });

    async function login() {
        const data = {
            username, password
        };
        const response = await axios.post('/api/register', data);
        console.log(response);
        $accounts = [response.data, ...$accounts];
        username = "";
        password = "";
    }

    async function removeAccount(username) {
        const response = await axios.delete('/api/register/' + username);
        if (response.data.username === username) {
            $accounts = $accounts.filter(a => a.username !== username)
        }
    }
</script>

<style>
    .app {
        margin: 40px auto;
        max-width: 500px;
    }
</style>

{#if loading}
    <Loading />
{/if}
<div class="app container">
    <div class="field">
        <p class="control has-icons-left has-icons-right">
        <input bind:value={username} class="input" required type="text" placeholder="Username">
        <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
        </span>
        </p>
    </div>
    <div class="field">
        <p class="control has-icons-left">
        <input class="input" bind:value={password} required type="password" placeholder="Password">
        <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
        </span>
        </p>
    </div>
    <div class="field">
        <p class="control">
        <button on:click={login} disabled={!loginBtn} class="button is-success">
            Register
        </button>
        </p>
    </div>

    <hr />
    <div class="notification is-info is-light has-tet-centered">
        Number of account created: {$accounts.length}
    </div>
    <p>Registered account</p>

    {#each sortedAccount as account (account.username)}
        <Account {account} {removeAccount} />
    {:else}
        <p>No account has registered yet</p>
    {/each}
</div>

<p>{username}</p>
<p>{password}</p>