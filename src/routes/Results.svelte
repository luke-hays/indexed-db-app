<script lang="ts">
  import type { Customer } from "../lib/interfaces/customer";
  import { EMPTY_DB_RESULTS } from '../lib/utils/constants';
  
  export let results: Array<Customer> = []
</script>

<div>
  {#if results.length > 0}
    <table>
      <thead>
        <th>name</th>
        <th>email</th>
        <th>total sales</th>
        <th>last order date</th>
      </thead>
      <tbody data-testid="customer-table">
        {#each results as {name, email, totalSales, dateOfLastOrder}}
        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{totalSales}</td>
          <td>{dateOfLastOrder}</td>
        </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>{EMPTY_DB_RESULTS}</p>
  {/if}
</div>

<style>
  div {
    background-color: rgb(165, 221, 165);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  th {
    text-align: left;
  }
</style>
