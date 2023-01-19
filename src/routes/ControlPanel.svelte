<script>
  import {loadDB} from "$lib/utils/db-init";
  import { NOTIFICATIONS, DB_EVENTS } from "$lib/utils/constants";

  import Logs from "./Logs.svelte";
  import Results from "./Results.svelte";
  import Notifications from "./Notifications.svelte";

  let loadButtonIsDisabled = false
  let queryButtonIsDisabled = false
  let clearButtonIsDisabled = true

  let notification = ''

  let events = []

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

  const onQueryDBClick = () => {}

  const onClearDBClick = () => {
    loadButtonIsDisabled = false
    clearButtonIsDisabled = true
  }
</script>

<Notifications message={notification}/>
<Results/>
<button on:click={onLoadDBClick} disabled={loadButtonIsDisabled}>
  LoadDB
</button>
<button on:click={onQueryDBClick} disabled={queryButtonIsDisabled}>
  QueryDB
</button>
<button on:click={onClearDBClick} disabled={clearButtonIsDisabled}>
  ClearDB
</button>

<Logs {events}/>