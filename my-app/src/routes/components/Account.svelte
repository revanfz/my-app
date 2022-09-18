<script>
    import { slide } from 'svelte/transition';
    export let account;
    export let removeAccount;
</script>

<style>
    .date {
        float: right;
    }
</style>

<div class="notification is-success is-light" transition:slide={{ duration: 500 }}>
    {account.username}
    <span class="is-size-7 has-text-grey date">
        {new Date(account.dateCreated).toLocaleString()}
    </span>
    <button class="delete" on:click={() => removeAccount(account.username)} />
</div>