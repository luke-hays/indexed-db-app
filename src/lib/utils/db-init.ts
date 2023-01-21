import type { Customer as CustomerType } from "../interfaces/customer"
interface DBEventTarget extends EventTarget {
  result: IDBDatabase
  error: DOMException
}

class Customer {
  dbName: string

  constructor(dbName : string) {
    this.dbName = dbName;
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. \
        Such and such feature will not be available.");
    }
  }

  /**
   * Remove all rows from the database
   * @memberof Customer
   */
  removeAllRows = () => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      const errorName = (event.target as DBEventTarget).error.name
      const errorMessage = (event.target as DBEventTarget).error.message
      console.log('removeAllRows - Database error: ', errorName, " - ", errorMessage);
    };

    request.onsuccess = (event) => {
      console.log('Deleting all customers...');

    const db = (event.target as DBEventTarget).result
      const txn = db.transaction('customers', 'readwrite');

      txn.onerror = (event) => {
        const errorName = (event.target as DBEventTarget).error.name
        const errorMessage = (event.target as DBEventTarget).error.message
        console.log('removeAllRows - Txn error: ', errorName, " - ", errorMessage);
      };

      txn.oncomplete = () => {
        console.log('All rows removed!');
      };

      const objectStore = txn.objectStore('customers');
      const getAllKeysRequest = objectStore.getAllKeys();

      getAllKeysRequest.onsuccess = () => {
        getAllKeysRequest.result.forEach(key => {
          objectStore.delete(key);
        });
      }
    }
  }

  /**
   * Populate the Customer database with an initial set of customer data
   * @param {[object]} customerData Data to add
   * @memberof Customer
   */
  initialLoad = (customerData: Array<CustomerType>) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      const errorName = (event.target as DBEventTarget).error.name
      const errorMessage = (event.target as DBEventTarget).error.message
      console.log('initialLoad - Database error: ', errorName, " - ", errorMessage);
    };

    request.onupgradeneeded = (event) => {
      console.log('Populating customers...');
      const db = (event.target as DBEventTarget).result
      const objectStore = db.createObjectStore('customers', { keyPath: 'userid' });
      
      // Create an index to search customers by name and email
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('totalSales', 'totalSales', { unique: false });
      objectStore.createIndex('dateOfLastOrder', 'dateOfLastOrder', { unique: false });

      // Populate the database with the initial set of rows
      customerData.forEach(function(customer) {
        objectStore.put(customer);
      });

      db.close();
    };
  }
}

// Web page event handlers
const DBNAME = 'customer_db';

/**
 * Clear all customer data from the database
 */
export const clearDB = () => {
  console.log('Delete all rows from the Customers database');
  const customer = new Customer(DBNAME);
  customer.removeAllRows();
}

/**
 * Add customer data to the database
 */
export const loadDB = () => {
  console.log('Load the Customers database');

  // Customers to add to initially populate the database with
  const customerData = [
    { userid: '444', name: 'Bill', email: 'bill@company.com', totalSales: 42, dateOfLastOrder: new Date() },
    { userid: '555', name: 'Donna', email: 'donna@home.org', totalSales: 114, dateOfLastOrder: new Date() }
  ];
  const customer = new Customer(DBNAME);
  customer.initialLoad(customerData);
}