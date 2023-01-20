import { DBNAME } from "./constants"

export const dbLogEventFormatter = (time: Date, event: string) => {
  return `${time} - ${event}`
}

export const queryDB = async (cb) => { 
  const request = indexedDB.open(DBNAME, 1);

  request.onerror = (event) => {
    console.log('queryDB- Database error: ', event.target.error.code,
      " - ", event.target.error.message);
  };

  request.onsuccess = (event) => {
    const db = event.target.result

    const transaction = db.transaction(["customers"]);
    const objectStore = transaction.objectStore("customers");
    const x = objectStore.getAll()

    let y = []
    x.onsuccess = (event) => {
      console.log('success', x.result)
      cb(x.result)
    }
  }
}