import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import SubHeader from '../components/Header/SubHeader';
import ListItem from '../components/ListItem/ListItem';
import {ItemsContext} from "../context/ItemContextProvider";
import {ListsContext} from "../context/ListContextProvider";

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

// const List = ({loading, error, match, history, list, listItems, getItemsRequest, getListRequest}) => {
const List = ({ match, history }) => {
	const { loading, error, items: listItems, getItemsRequest } = useContext(ItemsContext);
	const { list, getListRequest } = useContext(ListsContext);

	useEffect(() => {
		if(!list.id) getListRequest(match.params.id);
		if(!listItems.length) getItemsRequest(match.params.id);
	}, [listItems, getItemsRequest, match.params.id, list, getListRequest]);

	// const items = data && data.filter(item => item.listId === parseInt(match.params.id));
	const items = listItems && listItems.filter(item => item.listId === parseInt(match.params.id));
	// const list = lists && lists.find(list => list.id === parseInt(match.params.id));


	return !loading && !error ? (
		<>
			{history && list && (
				<SubHeader
					goBack={() => history.goBack()}
					openForm={() => history.push(`${match.url}/new`)}
					title={list.title}
				/>
			)}
			<ListItemWrapper>
				{items && items.map(item => <ListItem key={item.id} data={item}/>)}
			</ListItemWrapper>
		</>
	) : (
		<Alert>{loading ? 'Loading...' : error}</Alert>
	);
};

// export default withDataFetching({
// 	dataSource:
// 		'https://my-json-server.typicode.com/pranayfpackt/-React-Projects/items',
// })(List);
export default List;
