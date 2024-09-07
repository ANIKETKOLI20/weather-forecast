import dotenv from 'dotenv'
import axios from 'axios';

dotenv.config();

const CITY_API_URL = process.env.CITY_API_URL

export async function getCities(search, limit) {
  try {
    const params = {
      q: search,      // search term for cities
      rows: limit,    // number of rows to return
      sort: 'name',   // sorting by name
      facet: ['cou_name_en']  // facet by country name
    };

    const response = await axios.get(CITY_API_URL, { params });

    if (response.data && response.data.results && response.data.results.length > 0) {
      return response.data.results.map(record => ({
        id: record.geoname_id,
        name: record.name,
        country: record.cou_name_en,
        timezone: record.timezone,
      }));
    } else {
      console.error('No records found in the response:', response.data);
      return []; // Return an empty array if no records found
    }
  } catch (error) {
    console.error('Error fetching cities:', error.message);
    throw new Error('Failed to fetch cities');
  }
}
