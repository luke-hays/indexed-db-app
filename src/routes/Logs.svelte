<script>
  export let events = [];
</script>

<div>
  Logs:
  <ul>
    {#each events as event}
      <li>{event}</li>
    {/each}
  </ul>
</div>