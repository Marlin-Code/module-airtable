import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.API_KEY
})

// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP get method to display a Hello message
 */

export const addEmailToMailingList = async (event) => {
  const { email } = JSON.parse(event.body);
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email is required" }),
    };
  }
  try {
    const records = await addRecordsToBase([
      {
        fields: {
          email,
        },
      },
    ]);
    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
}


export function addRecordsToBase(records) {
  const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
  const table = process.env.AIRTABLE_TABLE_ID;
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