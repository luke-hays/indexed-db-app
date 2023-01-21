<script lang="ts">
  export let events: Array<string> = [];
</script>

<div>
  Logs:
  <ul>
    {#each events as event}
      <li>{event}</li>
    {/each}
  </ul>
</div>