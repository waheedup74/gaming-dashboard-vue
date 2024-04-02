import auth from '@/api/authApi';
import tenants from '@/api/tenantsApi';
import players from '@/api/playersApi';
import bets from '@/api/betsApi';
import payments from '@/api/paymentsApi';
import games from '@/api/gamesApi';
import brands from '@/api/brandsApi';
import bonuses from '@/api/bonusesApi';
import settingsApi from '@/api/settingsApi';

const api = {
  auth,
  tenants,
  players,
  games,
  brands,
  bonuses,
  bets,
  payments,
  settingsApi
};

export default api;
