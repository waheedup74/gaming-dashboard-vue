import instance from '@/api/axiosInstance';

const get = async () => {
  return await instance.get(`/settings`);
}

const createOrUpdate = async (data) => {
  return await instance.post('/settings', data);
}
 
export default {
  get,
  createOrUpdate
}