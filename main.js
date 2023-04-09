const loadEpisodesButton = document.getElementById('load-episodes');
const episodeList = document.getElementById('episode-list');

loadEpisodesButton.addEventListener('click', async () => {
  const episodes = await fetchPGNData('2023년 04월 10일_PGN_LOG.txt');
  
  episodeList.innerHTML = '';
  episodes.forEach((pgnData, index) => {
    const episodeLink = document.createElement('a');
    episodeLink.href = `#`;
    episodeLink.addEventListener('click', () => displayGames(pgnData));
    episodeLink.textContent = `EPISODE ${index + 1}`;
    episodeList.appendChild(episodeLink);
    episodeList.appendChild(document.createElement('br'));
  });
});

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

async function displayGames(pgnData) {
  const games = pgnData.split("\n\n\n").filter((game) => game.trim() !== "");
  const container = document.getElementById("games");

  container.innerHTML = '';

  games.forEach((game, index) => {
    const boardContainer = document.createElement("div");
    boardContainer.id = `board-${index}`;
    container.appendChild(boardContainer);

    const chess = new Chess();
    chess.load_pgn(game);

    const config = {
      position: chess.fen(),
      draggable: false,
    };

    const board = Chessboard(boardContainer.id, config);

    const gameInfo = document.createElement("p");
    gameInfo.innerHTML = `게임 ${index + 1}: ${chess.header("White")} 대 ${chess.header("Black")} - 결과: ${chess.header("Result")}`;
    container.appendChild(gameInfo);
  });
}

async function fetchPGNData(filename) {
  const response = await fetch('/pgn_txt/' + filename);
  const fileContent = await response.text();
  return fileContent.split('\n\n').filter(pgn => pgn.trim() !== '');
}
