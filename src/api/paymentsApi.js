import instance from '@/api/axiosInstance';

const getPayments = async (paymentId, playerId, dateCreated, type, amount, page, sortByColumn, sortDirection, pageSize) => {
  return await instance.get(`/payments/get-payments?id=${paymentId}&playerId=${playerId}&dateCreated=${dateCreated || ''}&type=${type}&amount=${amount}&page=${page}&sortByColumn=${sortByColumn}&sortDirection=${sortDirection}&pageSize=${pageSize}`);
}

export default {
  getPayments,
}