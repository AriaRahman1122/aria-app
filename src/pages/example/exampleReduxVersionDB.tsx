import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/exampleStoreDB';
import { fetchItems, addNewItem, updateExistingItem, removeItem, setSearchTerm } from '@/store/exampleItemSlicesDB';

import { Item } from '@/types/type';

const ItemList = () => {
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const dispatch = useAppDispatch();
  const { items, searchTerm, status } = useAppSelector((state) => state.example);

  useEffect(() => {
    dispatch(fetchItems(searchTerm));
  }, [searchTerm, dispatch]);

  const handleSubmit = async () => {
    if (editingItem) {
      await dispatch(updateExistingItem({ id: editingItem.id, name: newItemName }));
    } else {
      await dispatch(addNewItem(newItemName));
    }
    setEditingItem(null);
    setNewItemName('');
  };

  const handleCancel = () => {
    setEditingItem(null);
    setNewItemName('');
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search items..."
      />
      <br />
      <input
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder={editingItem ? 'Edit item' : 'Add new item'}
      />
      
      <button onClick={handleSubmit}>
        {editingItem ? 'Update' : 'Add'}
      </button>

      {editingItem && (
          <button 
          onClick={() => 
            {handleCancel();}}
          >
            Cancel
          </button>
        )}

      {status === 'loading' && <p>Loading...</p>}
      
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => {
              setEditingItem(item);
              setNewItemName(item.name);
            }}>
              Edit
            </button>
            <button onClick={() => dispatch(removeItem(item.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;