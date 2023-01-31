<script lang="ts">
  import type { Customer } from "../lib/interfaces/customer";
  import { EMPTY_DB_RESULTS } from '../lib/utils/constants';
  
  export let results: Array<Customer> = []
</script>

<div>
  {#if results.length > 0}
    <table>
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>Total Sales</th>
        <th>Last order date</th>
      </thead>
      <tbody data-testid="customer-table">
        {#each results as {name, email, totalSales, dateOfLastOrder}}
        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{totalSales}</td>
          <td>{dateOfLastOrder.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}</td>
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
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  table {
    border-collapse: collapse;
    margin: 10px;
    width: 80%;
  }

  table, th, td {
    border: 1px solid;
  }
  
  th, td {
    text-align: left;
  }
</style>
