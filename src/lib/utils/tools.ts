import type { Customer } from "../interfaces/customer"
import { DBNAME } from "./constants"

interface DBEventTarget extends EventTarget {
  result: IDBDatabase
  error: DOMException
}

type RequestCallback = (a: Array<Customer>) => void

export const dbLogEventFormatter = (time: Date, event: string) => {
  return `${time} - ${event}`
}

export const queryDB = async (cb: RequestCallback) => { 
  const request = indexedDB.open(DBNAME, 1);

  request.onerror = (event) => {
    const errorName = (event.target as DBEventTarget).error.name
    const errorMessage = (event.target as DBEventTarget).error.message
    console.log('queryDB- Database error: ', errorName, " - ", errorMessage);
  };

  request.onsuccess = (event) => {
    const db = (event.target as DBEventTarget).result

    const transaction = db.transaction(["customers"]);
    const objectStore = transaction.objectStore("customers");
    const dbRequest = objectStore.getAll()

    dbRequest.onsuccess = () => {
      cb(dbRequest.result)
    }
  }
}