import '../../App.css';

import { useAppDispatch } from '../../app/hooks';

import {
    getAll, getAllInCategory,
} from '../Good/goodSlice';

interface ButtonProps {
    title: string;
    category: string
}

function CategoryButton(props: ButtonProps) {
    const dispatch = useAppDispatch();
  

    const getGoodsInCategory = () => {
        if (props.category == "root") {
            dispatch(getAll());
        }
        else {
            dispatch(getAllInCategory(props.category))
        }
    }
    return (
        <>
            <button className='category-btn' onClick={() => getGoodsInCategory()}>{props.title}</button>
        </>
    )
}

export default CategoryButton;
