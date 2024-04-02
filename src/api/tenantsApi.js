import instance from '@/api/axiosInstance';

const getTenants = async () => {
  return await instance.get('/tenant/get-tenants');
}

const getUsers = async (tenantId) => {
  return await instance.get('/tenant/get-users?tenantId=' + tenantId);
}

const createTenant = async (name, key, website) => {
  return await instance.post('/tenant/create-tenant', {
    name,
    key,
    website
  });
}

const addUserToTenant = async (userName, tenantId) => {
  return await instance.post('/tenant/add-user', {
    userName,
    tenantId,
  });
}

const removeUserFromTenant = async (userId, tenantId) => {
  return await instance.post('/tenant/remove-user', {
    userId,
    tenantId,
  });
}

export default {
  getTenants,
  createTenant,
  addUserToTenant,
  removeUserFromTenant,
  getUsers,
}