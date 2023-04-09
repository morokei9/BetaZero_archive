const loadEpisodesButton = document.getElementById('load-episodes');
const episodeList = document.getElementById('episode-list');

loadEpisodesButton.addEventListener('click', async () => {
  const episodes = await fetchPGNData('2023년 04월 10일_PGN_LOG.txt');
  
  episodeList.innerHTML = '';
  episodes.forEach((pgnData, index) => {
    const episodeLink = document.createElement('a');
    episodeLink.href = `https://lichess.org/api/import?pgn=${encodeURIComponent(pgnData)}`;
    episodeLink.target = '_blank';
    episodeLink.textContent = `EPISODE ${index + 1}`;
    episodeList.appendChild(episodeLink);
    episodeList.appendChild(document.createElement('br'));
  });
});

async function fetchPGNData(filename) {
  const response = await fetch('/pgn txt/' + filename);
  const fileContent = await response.text();
  return fileContent.split('\n\n').filter(pgn => pgn.trim() !== '');
}
