document.addEventListener('DOMContentLoaded', () => {
    const spotifyPlayer = document.getElementById('spotify-player');
    const quoteContainer = document.getElementById('quote');

    const moodPlaylists = {
        'Happy': 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC',
        'Sad': 'https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1',
        'Angry': 'https://open.spotify.com/embed/playlist/37i9dQZF1DWVqfgj8NZEpB',
        'Calm': 'https://open.spotify.com/embed/playlist/37i9dQZF1DX3PIPIT6lEg5',
        'Anxious': 'https://open.spotify.com/embed/playlist/37i9dQZF1DX6VdMW310YC7'
    };

    window.selectVibe = function(vibe) {
        const playlistUrl = moodPlaylists[vibe] || 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M';
        spotifyPlayer.src = playlistUrl;
        quoteContainer.innerText = `"Let your ${vibe.toLowerCase()} vibe shine bright!" - VibeMatch`;
    };

    window.shareVibe = function() {
        const shareText = `I'm feeling great today with VibeMatch! Check it out: [YOUR WEBSITE URL]`;
        navigator.clipboard.writeText(shareText);
        alert('Vibe shared to clipboard!');
    };
});
