import express from 'express'
import cors from 'cors'
import { Resend } from 'resend';


import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log("OOOOOOOOOOOO: " + __dirname)
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') })
const resend = new Resend(process.env.RESEND_API_KEY)

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', "https://www.qirayah.com", "https://qirayah.com"]}));
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

app.get('/api/juz', async (req, res) => {
  try {
    const response = await fetch('https://api.quran.com/api/v4/juzs');

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch juz' })
  }
})

app.get('/api/chapter_recitations/:id/:chapter_number', async (req, res) => {
  
  const { id, chapter_number } = req.params;

  try {
    const response = await fetch(
      `https://api.quran.com/api/v4/chapter_recitations/${id}/${chapter_number}`
    );
    const data = await response.json() // decoding data i recieved
    res.json(data) // encoding the data
    // console.log(data)
  } catch (myError) {
    res.status(500).json({ error: 'Failed to fetch audio recitation'})
  }
})

const eligible_reciters_ids = [];

app.get("/api/reciters", async (req, res) => {
  try {
    const response = await fetch(
      'https://www.mp3quran.net/api/v3/reciters?language=eng'
    );
    const data = await response.json();
    // const filtered;
    res.json(data);
    // console.log(data)
  } catch (myErr) {
    res.status(500).json({ error: 'Failed to fetch list of reciters '})
  }
})

app.post('/api/suggest-reciter', async (req, res) => {
  console.log("route hit", req.body)
  const { name, link, note } = req.body;
  console.log("API key:", process.env.RESEND_API_KEY);
  try {
    const response = await resend.emails.send({
      from: 'Qirayah <support@qirayah.com>',
      to: 'support@qirayah.com',
      subject: '1 New Reciter Suggestion!',
      html: `<p><b>Reciter:</b> ${name}</p>
             <p><b>Link:</b> ${link}</p>
             <p><b>Note:</b> ${note}</p>`
    })
    res.json({ success: true })
    console.log(response)
  } catch (myErr) {
    console.log(myErr)
    res.status(500).json({ error: 'Failed to submit form.. '})
  }
})

app.listen(3001, () => console.log('Express on port 3001'));