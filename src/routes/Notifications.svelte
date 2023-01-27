<script lang="ts">
  export let message: string = 'test';
</script>

<div>
  {message}
</div>

<style>
  div {
    height: 1.5em;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    font-family: sans-serif;
  }
</style>