import { useState, useEffect } from 'react';
import type { NextPage } from 'next';

interface Item {
  id: number;
  name: string;
}

const ExamplePage: NextPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data
  const fetchItems = async () => {
    const res = await fetch(`/api/items?search=${searchTerm}`);
    const data = await res.json();
    setItems(data);
  };

  // Create
  const addItem = async () => {
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem }),
    });
    setNewItem('');
    fetchItems();
  };

  // Update
  const updateItem = async () => {
    if (!editingItem) return;
    
    await fetch(`/api/items/${editingItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem }),
    });
    
    setEditingItem(null);
    setNewItem('');
    fetchItems();
  };

  // Delete
  const deleteItem = async (id: number) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  // Handle search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Item Manager</h1>
      
      {/* Search */}
      <input
        type="text"
        placeholder="Search items..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Add/Edit Form */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder={editingItem ? 'Edit item...' : 'Add new item...'}
          className="border p-2 flex-grow"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          onClick={editingItem ? updateItem : addItem}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          {editingItem ? 'Update' : 'Add'}
        </button>
        {editingItem && (
          <button
            onClick={() => {
              setEditingItem(null);
              setNewItem('');
            }}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        )}
      </div>
      
      {/* Items List */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border p-2">
            <span>{item.name}</span>
            <div>
              <button
                onClick={() => {
                  setEditingItem(item);
                  setNewItem(item.name);
                }}
                className="bg-yellow-500 text-white p-1 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white p-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Item Count */}
      <div className="mt-4 text-sm text-gray-500">
        Total items: {items.length}
      </div>
    </div>
  );
};

export default ExamplePage;