const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(express.static('vibe-match-app'));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/getPlaylist', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo"
        });

        let playlistUrl = response.choices[0].message.content.trim();

        const match = playlistUrl.match(/playlist\\/([a-zA-Z0-9]+)/);
        if (match && match[1]) {
            playlistUrl = `https://open.spotify.com/embed/playlist/${match[1]}`;
        } else {
            // Hardcoded mood-based fallback playlists
            const fallbackPlaylists = {
                'happy': '37i9dQZF1DXdPec7aLTmlC',
                'sad': '37i9dQZF1DX7qK8ma5wgG1',
                'angry': '37i9dQZF1DWVqfgj8NZEpB',
                'calm': '37i9dQZF1DX3PIPIT6lEg5',
                'anxious': '37i9dQZF1DX6VdMW310YC7'
            };

            const moodKey = prompt.match(/feeling (\w+)/i)?.[1]?.toLowerCase();
            const fallbackPlaylistId = fallbackPlaylists[moodKey] || '37i9dQZF1DXcBWIGoYBM5M';

            playlistUrl = `https://open.spotify.com/embed/playlist/${fallbackPlaylistId}`;
        }

        console.log('Serving playlist URL:', playlistUrl);
        res.json({ playlistUrl });
    } catch (error) {
        console.error(error);
        res.json({ playlistUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M' });
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
