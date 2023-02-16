import { createRecords } from "./AirtableService.mjs";

export const addEmailToMailingList = async (event) => {
  const { email } = JSON.parse(event.body);
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email is required" }),
    };
  }
  try {
    const records = await createRecords([
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
