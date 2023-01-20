const EMPTY_DB_RESULTS = 'No DB data to display, please click LoadDB to create data.'

const NOTIFICATIONS = {
  LOAD_BEGIN: 'Loading Database...',
  LOAD_END: 'Database Loaded.',
  QUERY_BEGIN: 'Querying Database...',
  QUERY_END: 'Records Retrieved',
  CLEAR_BEGIN: 'Clear Database...',
  CLEAR_END: 'Database Cleared.',
}

const DB_EVENTS = {
  LOAD: 'Load database called',
  QUERY: 'Query database called',
  CLEAR: 'Clear database called'
}

const DBNAME = 'customer_db';

export { EMPTY_DB_RESULTS, NOTIFICATIONS, DB_EVENTS, DBNAME }