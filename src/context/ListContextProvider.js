import React, {useReducer} from 'react';

export const ListsContext = React.createContext();

// for flux pattern
const initialValue = {
	lists: [],
	list: {},
	loading: true,
	error: ''
};

const reducer = (value, action) => {
	switch (action.type) {
		case 'GET_LISTS_SUCCESS':
			return {
				...value,
				lists: action.payload,
				loading: false,
			};
		case 'GET_LISTS_ERROR':
			return {
				...value,
				lists: [],
				loading: false,
				error: action.payload
			};
		case 'GET_LIST_SUCCESS':
			return {
				...value,
				list: action.payload,
				loading: false
			};
		case 'GET_LIST_ERROR':
			return {
				...value,
				list: {},
				loading: false,
				error: action.payload
			}
		default:
			return value;
	}
}

async function fetchData(dataSource) {
	try {

		const data = await fetch(dataSource);
		const dataJSON = await data.json();

		if (dataJSON)
			return await ({data: dataJSON, error: false})
	} catch (error) {
		return ({data: false, error: error.message});
	}
}

// const ListContextProvider = ({ children, data }) => {
// 	return (
// 		<ListContext.Provider value={{ lists: data }}>
// 			{ children }
// 		</ListContext.Provider>
// 	);
// }

const ListContextProvider = ({children}) => {
	// flux 패턴을 사용한다며 useState를 제거하고 useReducer를 사용한다
	// const [lists, setLists] = useState([]);

	// useEffect(() => {
	// 	const asyncFetchData = async dataSource => {
	// 		const result = await fetchData(dataSource);
	// 		setLists([...result.data]); // 레퍼런스를 바꾸는건데 어차피 매번 바뀌는 레퍼런스를 다시 바꿀 이유가 있나?
	// 	};
	//
	// 	asyncFetchData('https://my-json-server.typicode.com/crazyk1804/react-projects-05-shopping-list/lists');
	// }, [fetchData, setLists]);
	// fetchData와 setLists를 넣은건 잘 이해가 안되지만 설명에는 mount되는 시점에 생성이 되는 것이기 때문에
	// componentDidMount와 동일한 효과를 낸다고 한다. 그냥 []를 써도 마찬가지 일텐데?

	const [value, dispatch] = useReducer(reducer, initialValue);
	const getListsRequest = async () => {
		const result = await fetchData(
			'https://my-json-server.typicode.com/crazyk1804/react-projects-05-shopping-list/lists'
		);
		if (result.data && result.data.length) {
			dispatch({type: 'GET_LISTS_SUCCESS', payload: result.data});
		} else {
			dispatch({type: 'GET_LISTS_ERROR', payload: result.error});
		}
	}

	const getListRequest = async id => {
		const result = await fetchData(
			`https://my-json-server.typicode.com/crazyk1804/react-projects-05-shopping-list/lists/${id}`
		);
		if (result.data) {
			dispatch({ type: 'GET_LIST_SUCCESS', payload: result.data });
		} else {
			dispatch({ type: 'GET_LIST_ERROR', payload: result.error });
		}
	}

	// const addListRequest = (content) => {
	// 	actionDispatch({
	// 		type: 'ADD_LIST_REQUEST',
	// 		payload: {
	// 			dataSource: `https://my-json-server.typicode.com/crazyk1804/react-projects-05-shopping-list/items`,
	// 			content,
	// 		}
	// 	});
	// };

	return (
		// <ListContext.Provider value={{ lists }}>
		<ListsContext.Provider value={{...value, getListsRequest, getListRequest}}>
			{children}
		</ListsContext.Provider>
	);
}

// export default withDataFetching({
// 	dataSource: 'https://my-json-server.typicode.com/crazyk1804/react-projects-05-shopping-list/lists',
// })(ListContextProvider);
export default ListContextProvider;