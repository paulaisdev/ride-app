import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CacheState {
  addresses: { [key: string]: string[] }; 
}

const initialState: CacheState = {
  addresses: {
    origin: [],
    destination: [],
  },
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    saveAddress: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key, value } = action.payload;
      if (!state.addresses[key]) {
        state.addresses[key] = [];
      }
      if (!state.addresses[key].includes(value)) {
        state.addresses[key].push(value);
      }
    },
  },
});

// Função para buscar sugestões de endereços
export const getAddressSuggestions = (addresses: { [key: string]: string[] }, query: string): string[] => {
  const lowerCaseQuery = query.toLowerCase();
  return Object.values(addresses)
    .flat()
    .filter((address) => address.toLowerCase().includes(lowerCaseQuery));
};

export const { saveAddress } = cacheSlice.actions;
export default cacheSlice.reducer;
