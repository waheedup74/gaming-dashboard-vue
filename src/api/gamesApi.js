import instance from '@/api/axiosInstance';

const getGames = async (provider, name, page) => {
  return await instance.get(`/games/get-games?provider=${provider}&name=${name}&page=${page}`);
}

const createGameList = async (id, name, gameIds) => {
  return await instance.post(`/games/create-game-list/${id}`, {
    name,
    gameIds,
  });
}

const getGameLists = async () => {
  return await instance.get(`/games/get-game-lists`);
}

const getGameListsById = async (id) => {
  return await instance.get(`/games/get-game-list/${id}`);
}

export default {
  getGames,
  createGameList,
  getGameLists,
  getGameListsById
}