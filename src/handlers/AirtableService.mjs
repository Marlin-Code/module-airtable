import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.API_KEY
})
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_TABLE_ID;

export function createRecords(records) {
  return new Promise((resolve, reject) => {
    base(table).create(records, (err, record) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(record);
    });
  });
}

export function getRecord(recordId) {
  return new Promise((resolve, reject) => {
    base(table).find(recordId, (err, record) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(record);
      });
  })
}

export function updateRecord(recordId, fields) {
  return new Promise((resolve, reject) => {
    base(table).update(recordId, fields, (err, record) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(record);
    });
  });
}

export function updateRecords(records) {
  return new Promise((resolve, reject) => {
    base(table).update(records, (err, records) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(records);
    });
  });
}

export function deleteRecord(recordId) {  
  return new Promise((resolve, reject) => {
    base(table).destroy(recordId, (err, record) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(record);
    });
  });
}

export function deleteRecords(recordIds) {
  return new Promise((resolve, reject) => {
    base(table).destroy(recordIds, (err, records) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(records);
    });
  });
}

export function listRecords(offset, pageSize) {
  return new Promise((resolve, reject) => {
    base(table).select({
      offset,
      pageSize,
    }).firstPage((err, records) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(records);
    });
  });
}