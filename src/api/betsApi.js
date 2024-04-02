import instance from '@/api/axiosInstance';

const getBets = async (playerId, datePlaced, game, wager, page, sortByColumn, sortDirection, pageSize, id) => {
  return await instance.get(`/bets/get-bets?playerId=${playerId}&datePlaced=${datePlaced || ''}&game=${game}&wager=${wager}&page=${page}&sortByColumn=${sortByColumn}&sortDirection=${sortDirection}&pageSize=${pageSize}&id=${id}`);
}

export default {
  getBets,
}