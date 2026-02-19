import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AssetState {
  selectedAsset: string | null;
}

const initialState: AssetState = {
  selectedAsset: null,
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setSelectedAsset: (state, action: PayloadAction<string>) => {
      state.selectedAsset = action.payload;
    },
  },
});

export const { setSelectedAsset } = assetSlice.actions;
export default assetSlice.reducer;
