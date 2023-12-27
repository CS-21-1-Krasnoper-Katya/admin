import { useEffect, useState } from 'react';
import styles from './Good.module.css';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    selectCategory
} from '../../components/Category/categorySlice';
import {
    deleteGood,
    putNew
} from '../Good/goodSlice';


interface GoodProps {
    partitionKey: string;
    rowKey: string;
    name: string;
    price: number;
    category: string;
    imgUrl: string;
}

function Good(props: GoodProps) {
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [category, setCategory] = useState(props.category);
    const [imgUrl, setImgUrl] = useState('');

    const categories = useAppSelector(selectCategory);
    const dispatch = useAppDispatch();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(+event.target.value);
    }
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }


    const saveGood = () => {
        dispatch(putNew({
            newGood: {
                partitionKey: props.partitionKey,
                rowKey: props.rowKey,
                category,
                name,
                price,
                imgUrl: props.imgUrl
            }
        }));
    }
    const removeGood = () => {
        dispatch(deleteGood({
            partitionKey: props.partitionKey,
            rowKey: props.rowKey,
        }));
    }

    const resetGood = () => {
        setName(props.name);
        setCategory(props.category);
        setPrice(props.price);
    }
    
    useEffect(() => {
        const getImgObj = async () => {
            const resp = await fetch(props.imgUrl);
            const blob = await resp.blob();
            return URL.createObjectURL(blob);
        }
        getImgObj()
            .then(res => setImgUrl(res))
            .catch(err => console.log(err));
    }, [])
    
    return (
        <>
            <div className={styles.goodWrapper}>
                <img className={styles.goodImg} src={imgUrl}/>
                <form className={styles.goodInfo}>
                    <input
                        value={name}
                        onChange={handleNameChange}/>
                    <input
                        value={price}
                        type='number'
                        min={1}
                        onChange={handlePriceChange}/>
                    <select value={category} onChange={handleCategoryChange}>
                        {
                            categories.map((item) => (
                                <option key={item.partitionKey+item.rowKey} value={item.name}>{item.name}</option>
                            ))
                        }
                    </select>
                    <div className={styles.btnsGroup}>
                        <button onClick={() => resetGood()}>Reset</button>
                        <button onClick={() => saveGood()}>Save</button>
                        <button onClick={() => removeGood()}>Remove</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Good;
