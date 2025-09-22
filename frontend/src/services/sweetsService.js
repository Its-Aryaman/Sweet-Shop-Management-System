import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const API_URL = '/api/sweets';

const addSweet = async (sweet) => {
  try {
    return await axios.post(API_URL, sweet);
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to add sweet');
  }
};

const getSweets = async () => {
  try {
    return await axios.get(API_URL);
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch sweets');
  }
};

const searchSweets = async (query) => {
  try {
    return await axios.get(`${API_URL}/search?${query}`);
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Search failed');
  }
};

const updateSweet = async (id, sweet) => {
  try {
    return await axios.put(`${API_URL}/${id}`, sweet);
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update sweet');
  }
};

const deleteSweet = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to delete sweet');
  }
};

const purchaseSweet = async (id, quantity) => {
  try {
    return await axios.post(`${API_URL}/${id}/purchase`, { quantity });
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Purchase failed');
  }
};

const restockSweet = async (id, quantity) => {
  try {
    return await axios.post(`${API_URL}/${id}/restock`, { quantity });
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Restock failed');
  }
};

export { addSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet };