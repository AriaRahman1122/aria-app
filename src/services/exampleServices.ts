import { Item } from '../types/type';

const API_BASE_URL = '/api/items';

export const fetchItems = async (searchTerm = ''): Promise<Item[]> => {
  const response = await fetch(`${API_BASE_URL}?search=${encodeURIComponent(searchTerm)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const createItem = async (name: string): Promise<Item> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
};

export const updateItem = async (id: number, name: string): Promise<Item> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error('Failed to update item');
  }
  return response.json();
};

export const deleteItem = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
};