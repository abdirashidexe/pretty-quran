import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/surah/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://api.quran.com/api/v4/chapters/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch surah' });
  }
});

app.get('/api/surahs', async (req, res) => {
  try {
    const response = await fetch('https://api.quran.com/api/v4/chapters');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch surahs' });
  }
});

app.get('/api/surah/:id/verses', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en&words=true&per_page=300&word_fields=text_uthmani`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch verses' });
  }
});

app.listen(3001, () => console.log('Express on port 3001'));