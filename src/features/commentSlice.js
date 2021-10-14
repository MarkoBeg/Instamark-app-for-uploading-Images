import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentId: null,
  },
  reducers: {
    setCommentInfo: (state, action) => {
      state.commentId = action.payload.commentId;
    },
  },
});

export const { setCommentInfo } = commentSlice.actions;

export const selectCommentId = (state) => state.comment.commentId;

export default commentSlice.reducer;
