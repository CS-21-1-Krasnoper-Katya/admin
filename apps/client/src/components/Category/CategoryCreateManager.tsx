import { useState } from 'react';
import styles from './CategoryCreateManager.module.css';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    
} from '../Good/goodSlice';

import {
    selectCategory,
    create
} from '../Category/categorySlice';


function CategoryCreateManager() {
    const [categoryName, setCateogoryName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    
    const categories = useAppSelector(selectCategory);
    const dispatch = useAppDispatch();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCateogoryName(event.target.value);
    }
    const handleChangeParentCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setParentCategory(event.target.value);
    }

    const handleCreate = () => {
        dispatch(create({name: categoryName, parentCategory}));
    }
  
    return (
        <>
            <form className={styles.createForm}>
                <label>Name</label>
                <input value={categoryName} onChange={handleChangeName}/>
                <label>Parent Category</label>
                <select value={parentCategory} onChange={handleChangeParentCategory}>
                    <option key='root' value='root'>root</option>
                    {
                        categories.map((item) => (
                            <option key={item.partitionKey+item.rowKey} value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
                <button onClick={handleCreate}>Create new category</button>
            </form>
        </>
    )
}

export default CategoryCreateManager;
