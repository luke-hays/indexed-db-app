<script lang="ts">
  import type { Customer } from "$lib/interfaces/customer";
  import { EMPTY_DB_RESULTS } from '$lib/utils/constants';
  
  export let results: Array<Customer> = []
</script>

{#if results.length > 0}
  <table>
    <thead>
      <th>name</th>
      <th>email</th>
    </thead>
    <tbody data-testid="customer-table">
      {#each results as {name, email}}
      <tr>
        <td>{name}</td>
        <td>{email}</td>
      </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>{EMPTY_DB_RESULTS}</p>
{/if}
