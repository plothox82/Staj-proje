import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/exchange-rates', async (req, res) => {
  try {
    const response = await axios.get('https://www.tcmb.gov.tr/kurlar/today.xml');
    res.send(response.data);
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    res.status(500).send('Failed to fetch exchange rates');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
