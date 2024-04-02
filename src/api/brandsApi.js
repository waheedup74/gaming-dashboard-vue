import instance from '@/api/axiosInstance';

const getBrandStats = async () => {
  return await instance.get(`/brands/get-brand-stats`);
}

const getAllBrandStats = async () => {
  return await instance.get(`/brands/get-all-brand-stats`);
}

export default {
  getBrandStats,
  getAllBrandStats
}