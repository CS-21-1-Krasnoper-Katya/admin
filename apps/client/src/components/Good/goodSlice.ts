import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchAllGoods, fetchAllGoodsInCategory, fetchCreateGood, fetchEditGood, fetchRemoveGood } from './goodAPI';


export interface GoodType {
    partitionKey: string;
    rowKey: string;
    category: string,
    name: string;
    price: number;
    imgUrl: string,
}

export interface CreateGoodType {
    category: string,
    name: string;
    price: number;
    imgUrl: string,
}

export interface GoodState {
    value: Array<GoodType>;
    status: 'idle' | 'loading' | 'failed';
}
  
const initialState: GoodState = {
    value: [],
    status: 'idle',
};


export const getAll = createAsyncThunk(
    'good/fetchGoods',
    async () => {
        const response = await fetchAllGoods();
        return await response.json();
    }
);
export const getAllInCategory = createAsyncThunk(
    'good/fetchGoodsInCategory',
    async (partitionKey: string) => {
        const response = await fetchAllGoodsInCategory(partitionKey);
        return await response.json();
    }
);
export const create = createAsyncThunk(
    'good/fetchCreateGood',
    async ({name, category, price, imgUrl, imgFormData}: {name: string, category: string, price: number, imgUrl: string, imgFormData: FormData}) => {
        const response = await fetchCreateGood({name, category, price, imgUrl}, imgFormData);
        await response.json();
    }
);
export const putNew = createAsyncThunk(
    'good/fetchEditGood',
    async ({newGood}: {newGood: GoodType}) => {
        const response = await fetchEditGood(newGood.partitionKey, newGood.rowKey, newGood);
        return await response.json();
    }
);
export const deleteGood = createAsyncThunk(
    'good/fetchDeleteGood',
    async ({partitionKey, rowKey}: {partitionKey: string, rowKey: string}) => {
        const response = await fetchRemoveGood(partitionKey, rowKey);
        return await response.json();
    }
);


export const goodSlice = createSlice({
    name: 'good',
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
            })
            .addCase(getAllInCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllInCategory.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(getAllInCategory.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(putNew.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(putNew.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(putNew.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { } = goodSlice.actions;

export const selectGood = (state: RootState) => state.good.value;

export default goodSlice.reducer;