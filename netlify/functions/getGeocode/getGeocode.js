require("dotenv").config();
const axios = require("axios");
const handler = async (event) => {
  try {
    const { location } = event.queryStringParameters;
    const API_KEY = process.env.API_KEY;
    let response = await axios.get(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${location}&access_token=${API_KEY}`
    );

    let data = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
