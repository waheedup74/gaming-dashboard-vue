import instance from '@/api/axiosInstance';

const getPlayers = async (id, signupDate, signupPromoCode, lastBet, ggr, wager, lastDeposit, page, sortByColumn, sortDirection, pageSize) => {
  return await instance.get(`/players/get-players?id=${id}&signupDate=${signupDate || ''}&signupPromoCode=${signupPromoCode}&lastBetDate=${lastBet || ''}&lastDepositDate=${lastDeposit || ''}&ggr=${ggr}&wager=${wager}&page=${page}&sortByColumn=${sortByColumn}&sortDirection=${sortDirection}&pageSize=${pageSize}`);
}

const getPlayer = async (id) => {
  return await instance.get('players/get-player?id=' + id);
}

const postToogleExcludePlayerBonues = async (id) => {
  return await instance.post(`/players/toogle-exclude-player-bonuses/${id}`);
}

const postPlayersFromCSV = async (players) => {
  return await instance.post(`/players/save-from-csv/`, players);
}

const forfeitBonues = async (id) => {
  return await instance.post(`/players/forfeit-bonues/${id}`);
}

export default {
  getPlayers,
  getPlayer,
  postToogleExcludePlayerBonues,
  postPlayersFromCSV,
  forfeitBonues
}