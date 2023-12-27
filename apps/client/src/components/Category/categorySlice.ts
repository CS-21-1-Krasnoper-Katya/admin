import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCategories, fetchCreateCategory } from './categoryAPI';


interface Category {
    partitionKey: string;
    rowKey: string;
    name: string;
    parentCategory: string;
}

export interface PostCategory {
    name: string;
    parentCategory: string;
}

export interface CategoryState {
    value: Array<Category>;
    status: 'idle' | 'loading' | 'failed';
}
  
const initialState: CategoryState = {
    value: [],
    status: 'idle',
};


export const getAll = createAsyncThunk(
    'category/fetchCategories',
    async () => {
        const response = await fetchCategories();
        return await response.json();
    }
);
export const create = createAsyncThunk(
    'category/fetchCreateCategory',
    async ({name, parentCategory}: {name: string, parentCategory: string}) => {
        const response = await fetchCreateCategory({name, parentCategory});
        return await response.json();
    }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(getAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { } = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category.value;

export default categorySlice.reducer;