import { PostCategory } from "./categorySlice";

export async function fetchCategories() {
    return await fetch('api/categories');
}
export async function fetchCreateCategory(newCategory: PostCategory) {
    return await fetch('api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
    });
}

