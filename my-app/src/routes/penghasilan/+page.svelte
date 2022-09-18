<script>
    import axios from "axios";
    import { onMount } from "svelte";

    let money = 0;
    let typeOfIncome = "";
    let transaksi = [];

    onMount( async() => {
        const res = await fetch('/api/pendapatan');
        transaksi = await res.json()
    });

    async function saveIncome() {
        const data = { value: typeOfIncome === "+" ? money : money * -1 };
        const response = await axios.post('/api/pendapatan', data);
        transaksi = [response.data, ...transaksi];
        money = 0;
    }

    async function removeTransaction(id) {
        const response = await axios.delete('/api/pendapatan/' + id);
        if (response.data.id === id) {
            transaksi = transaksi.filter(a => a._id !== id)
        }
    }

</script>

<style>
.app {
    margin: 40px auto;
    max-width: 500px;
}
</style>

<div class="app container">
    <div class="field has-addons has-addons-centered">
        <p class="control">
        <span class="select">
            <select bind:value={typeOfIncome}>
            <option value="+">+</option>
            <option value="-">-</option>
            </select>
        </span>
        </p>
        <p class="control">
        <input bind:value={money} class="input" type="text" placeholder="Amount of money">
        </p>
        <p class="control">
            <button on:click={saveIncome} class="button is-primary">Save</button>
        </p>
    </div>
    <p>{money}</p>
    <p>{typeOfIncome}</p>
    {#each transaksi as transaction}
        <div class="notification is-success">
            {transaction.value}
            <button on:click={ () => removeTransaction(transaction._id)} class="delete"></button>
        </div>
    {/each}
</div>