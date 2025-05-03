import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Item } from '../types/type';
import {
  fetchItems as fetchItemsAPI,
  createItem as createItemAPI,
  updateItem as updateItemAPI,
  deleteItem as deleteItemAPI,
} from '../services/exampleServicesDB';

interface ItemsState {
  items: Item[];
  searchTerm: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  searchTerm: '',
  status: 'idle',
  error: null,
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      return await fetchItemsAPI(searchTerm);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewItem = createAsyncThunk(
  'items/addNewItem',
  async (name: string, { rejectWithValue }) => {
    try {
      return await createItemAPI(name);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExistingItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, name }: { id: number; name: string }, { rejectWithValue }) => {
    try {
      return await updateItemAPI(id, name);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  'items/deleteItem',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteItemAPI(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: 'itemsdb',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateExistingItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { setSearchTerm } = itemsSlice.actions;
export default itemsSlice.reducer;