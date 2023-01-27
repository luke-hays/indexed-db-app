<script lang="ts">
  export let events: Array<string> = [];
</script>

<div>
  <table>
    <thead>
      <th>Logs</th>
    </thead>
    <tbody data-testid="customer-table">
      {#each events as event}
      <tr>
        <td>{event}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  div {
    background-color: rgb(255, 255, 255);
  }

  table {
    border: 1px solid black;
  }
  th {
    font-family: sans-serif;
    text-align: left;
    padding-left: 10px;
    width: 100vw;
  }

  td {
    font-family: monospace;
    padding-left: 20px;
    width: 100vw;
    border-top: 1px solid black;
  }
</style>