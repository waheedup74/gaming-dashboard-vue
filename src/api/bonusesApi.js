import instance from '@/api/axiosInstance';

const createWelcomeOffer = async (name, startDate, endDate, maxBudget, currency, minDeposit, signupCode, wagerRequired, period, gamesListId, numSpins, game, expires) => {
  return await instance.post('/bonuses/create-welcome-offer', {
    name, startDate, endDate, maxBudget, currency, minDeposit, signupCode, wagerRequired, period, gamesListId, numSpins, game, expires
  });
}

const updateWelcomeOffer = async (id, name, startDate, endDate, maxBudget, currency, minDeposit, signupCode, wagerRequired, period, gamesListId, numSpins, game, expires) => {
  return await instance.post('/bonuses/update-welcome-offer', {
    id, name, startDate, endDate, maxBudget, currency, minDeposit, signupCode, wagerRequired, period, gamesListId, numSpins, game, expires
  });
}

const addBonusPlayer = async (currency, expires, gameId, numberSpins, valueFreeSpins) => {
  return await instance.post('/bonuses/add-bonus-to-player', {
    valueFreeSpins, numberSpins, gameId, expires, currency 
  });
}

const getWelcomeOffers = async () => {
  return await instance.get(`/bonuses/get-welcome-offers`);
}

const getActiveWelcomeOffersPagination = async (page) => {
  return await instance.get(`/bonuses/get-active-welcome-offers/${page}`);
}

const getPastWelcomeOffersPagination = async (page) => {
  return await instance.get(`/bonuses/get-past-welcome-offers/${page}`);
}

const getWelcomeOfferById = async (id) => {
  return await instance.get(`/bonuses/get-welcome-offer/${id}`);
}

const getBonusBalances = async (page, sortByColumn, sortDirection, pageSize) => {
  return await instance.get(`/bonuses/get-balances?page=${page}&sortByColumn=${sortByColumn}&sortDirection=${sortDirection}&pageSize=${pageSize}`);
}

const getBonusBalance = async (id) => {
  return await instance.get(`/bonuses/get-balance/${id}`);
}

const getBonuses = async (playerId, page, sortByColumn, sortDirection, pageSize) => {
  return await instance.get(`/bonuses/get-bonuses?playerId=${playerId}&page=${page}&sortByColumn=${sortByColumn}&sortDirection=${sortDirection}&pageSize=${pageSize}`);
}

const getWoBonuses = async (id, page, sortByColumn, sortDirection, pageSize) => {
  return await instance.get(`/bonuses/get-wo-bonuses?welcomeOfficeId=${id}&page=${page}&sortByColumn=${sortByColumn}&sortDirection=${sortDirection}&pageSize=${pageSize}`);
}

const creditFromCSV = async (playersIds, gameName, gameId, currency, expiresInDays, numberOfSpins, valueOfFreeSpin) => {
  return await instance.post('/bonuses/credit-from-csv', {
    playersIds, gameName, gameId, currency, expiresInDays, numberOfSpins, valueOfFreeSpin
  }); 
}

const disableOffer = async (offerId) => {
  return await instance.post('/bonuses/disable-welcome-offer', offerId); 
}

export default {
  createWelcomeOffer,
  addBonusPlayer,
  getWelcomeOffers,
  getWelcomeOfferById,
  getActiveWelcomeOffersPagination,
  getPastWelcomeOffersPagination,
  updateWelcomeOffer,
  getBonusBalances,
  getBonusBalance,
  getBonuses,
  getWoBonuses,
  creditFromCSV,
  disableOffer
}