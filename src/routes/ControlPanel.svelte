<script lang='ts'>
  import {clearDB, loadDB} from "../lib/utils/db-init";
  import { queryDB } from "../lib/utils/tools";
  import { NOTIFICATIONS, DB_EVENTS } from "../lib/utils/constants"; 

  import type { Customer } from "../lib/interfaces/customer";
  import Logs from "./Logs.svelte";
  import Results from "./Results.svelte";
  import Notifications from "./Notifications.svelte";

  let loadButtonIsDisabled = false
  let queryButtonIsDisabled = false
  let clearButtonIsDisabled = true

  let notification = ''

  let events: Array<string> = []
  let results: Array<Customer> = []

  const onLoadDBClick = () => {
    loadButtonIsDisabled = true
    notification = NOTIFICATIONS.LOAD_BEGIN
    setTimeout(() => {
      loadDB()
      notification = NOTIFICATIONS.LOAD_END
      clearButtonIsDisabled = false
      events = [DB_EVENTS.LOAD, ...events]
    }, 2000)
  }

  const onQueryDBClick = () => {
    notification = NOTIFICATIONS.QUERY_BEGIN
    setTimeout(() => {
      queryDB((data: Array<Customer>) => {
        results = [...data]
      })
      notification = NOTIFICATIONS.QUERY_END
      events = [DB_EVENTS.QUERY, ...events]
    }, 2000)
  }

  const onClearDBClick = () => {
    loadButtonIsDisabled = false
    notification = NOTIFICATIONS.CLEAR_BEGIN
    setTimeout(() => {
      clearDB()
      results = []
      notification = NOTIFICATIONS.CLEAR_END
      clearButtonIsDisabled = true
      events = [DB_EVENTS.CLEAR, ...events]
    }, 2000)
  }
</script>

<div id='control-panel'>
  <Notifications message={notification}/>
  <Results results={results}/>
  <div id='db-actions'>
    <button on:click={onLoadDBClick} disabled={loadButtonIsDisabled}>
      LoadDB
    </button>
    <button on:click={onQueryDBClick} disabled={queryButtonIsDisabled}>
      QueryDB
    </button>
    <button on:click={onClearDBClick} disabled={clearButtonIsDisabled}>
      ClearDB
    </button>
  </div>
  <Logs {events}/>
</div>


<style>
  #control-panel {
    border: 1px solid white;
  }

  #db-actions {
    background-color: white;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0px;
  }

  button {
    margin: 0px 5px;
    background-color: rgb(251, 253, 237);;
    border: 2px solid rgb(76, 82, 88);
    border-radius: 5px;
    font-family: sans-serif;
    height: 2em;
    width: 7em;
    transition: 0.3s;
    opacity: 0.6;
  }

  button:hover:enabled {
    opacity: 1;    
  }
</style>