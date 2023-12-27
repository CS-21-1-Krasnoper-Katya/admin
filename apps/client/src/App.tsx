import { useEffect } from 'react'
import './App.css'
import CategoryButton from './components/Category/CategoryButton';

import { useAppSelector, useAppDispatch } from './app/hooks';

import {
    getAll,
    selectCategory
} from './components/Category/categorySlice';

import {
    selectGood
} from './components/Good/goodSlice';
import Good from './components/Good/Good';
import CategoryCreateManager from './components/Category/CategoryCreateManager';
import GoodCreateManager from './components/Good/GoodCreateManager';

function App() {
	const categories = useAppSelector(selectCategory);
	const goods = useAppSelector(selectGood);
	
	const dispatch = useAppDispatch();
	

	useEffect(() => {
		dispatch(getAll());
	}, []);
  
  	return (
		<>
		<CategoryCreateManager/>
		<div className='app-wrapper'>
			<div className="categories">
			<CategoryButton key="root" category='root' title='All Categories'/>
			{
				categories.map((item) => (
				<CategoryButton key={item.partitionKey+item.rowKey} category={item.name} title={item.name}/>
				))
			}
			</div>
			<div className="main">
			<div className='goods'>
				<GoodCreateManager/>
				<h4>Goods in selected category</h4>
				{
					goods.map((item) => (
						<Good 
							key={item.partitionKey+item.rowKey} 
							partitionKey={item.partitionKey}
							rowKey={item.rowKey}
							name={item.name} 
							price={item.price} 
							category={item.category}
							imgUrl={item.imgUrl}
						/>
					))
				}
			</div>
			</div>
		</div>
		</>
  	) 
}

export default App
