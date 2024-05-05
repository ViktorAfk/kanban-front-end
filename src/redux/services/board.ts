import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface Board {
  boardId: string | null;
}

const initialState: Board = {
  boardId: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
  },
});

export const { setBoard } = boardSlice.actions;

export const setBoardIdValue = (state: RootState) => state.board.boardId;

export default boardSlice.reducer;
