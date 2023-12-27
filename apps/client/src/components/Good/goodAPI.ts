import { CreateGoodType, GoodType } from "./goodSlice";

export async function fetchAllGoods() {
    return await fetch('api/goods');
}
export async function fetchAllGoodsInCategory(partitionKey: string) {
    return await fetch('api/goods/'+partitionKey);
}
export async function fetchCreateGood(newGood: CreateGoodType, imgFormData: FormData) {
    const imgRes = await fetch('api/images', {method: 'POST', body: imgFormData});
    let imgUrl = (await imgRes.json())[0];
    newGood.imgUrl = imgUrl;
    return await fetch('api/goods/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGood),
    });
}
export async function fetchEditGood(partitionKey: string, rowKey: string, newGood: GoodType) {
    return await fetch('api/goods/'+partitionKey+'/'+rowKey, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGood),
    });
}
export async function fetchRemoveGood(partitionKey: string, rowKey: string) {
    return await fetch('api/goods/'+partitionKey+'/'+rowKey, {
        method: 'DELETE'
    });
}
