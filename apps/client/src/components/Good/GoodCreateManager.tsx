import { useState } from 'react';
import styles from './GoodCreateManager.module.css';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    create
} from '../Good/goodSlice';

import {
    selectCategory
} from '../Category/categorySlice';


function GoodCreateManager() {
    const [goodName, setGoodName] = useState('');
    const [price, setPrice] = useState(1);
    const [category, setCategory] = useState('');
    const [selectedImgFile, setSelectedImgFile] = useState<File | null>(null);
    
    const categories = useAppSelector(selectCategory);
    const dispatch = useAppDispatch();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoodName(event.target.value);
    }
    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(+event.target.value);
    }
    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null)
            setSelectedImgFile(event.target.files[0]);
    }
    const handleChangecategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }
  
    const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("files", selectedImgFile as Blob);
        dispatch(create({
            name: goodName,
            price,
            category,
            imgUrl: '',
            imgFormData: formData
        }))
    }
    
    return (
        <>
            <form className={styles.createForm}>
                <label>Name</label>
                <input value={goodName} onChange={handleChangeName}/>
                <label>Price</label>
                <input value={price} onChange={handleChangePrice}/>
                <label>Category</label>
                <select value={category} onChange={handleChangecategory}>
                    <option key='root' value='root'>root</option>
                    {
                        categories.map((item) => (
                            <option key={item.partitionKey+item.rowKey} value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
                <input onChange={handleChangeFile} type='file'/>
                <button onClick={handleCreate}>Create new good</button>
            </form>
        </>
    )
}

export default GoodCreateManager;
