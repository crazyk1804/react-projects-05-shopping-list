/**
 * 책의 내용에서 GlobalContext를 작성하면서 기존 사용방식 자체를 없애는 부분이 나와서
 * 남겨두고 싶어졌다
 */
import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import Header from '../components/Header/Header';
import Lists from './Lists';
import List from './List';
import Form from './Form';
import ListContextProvider from "../context/ListContextProvider";
import {ListsContext} from "../context/ListContextProvider";
import ItemsContextProvider, {ItemsContext} from "../context/ItemContextProvider";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (<>
		<GlobalStyle/>
		<AppWrapper>
			<Header/>
			<ListContextProvider>
				<ItemsContextProvider>
					<ListsContext.Consumer>
						{/*{({lists}) => {*/}
						{({ list, lists, loading: listsLoading, error: listsError, getListsRequest, getListRequest }) => {
							// destructuring으로 받을때 :를 써주면 변수명을 바꿔서 사용이 가능해진다
							console.log('lists: ', lists);
							return (
								<ItemsContext.Consumer>
									{({items, loading: itemsLoading, error: itemsError, getItemsRequest, addItemRequest }) => {
										return (
											<Switch>
												{/*<Route exact path='/' component={Lists}/>*/}

												{/*<Route exact path="/" render={props => {*/}
												{/*	return lists && <Lists lists={lists} {...props}/>*/}
												{/*}}/>*/}

												<Route exact path="/" render={ props => {
													return lists && <Lists
														lists={lists}
														loading={listsLoading}
														error={listsError}
														getListsRequest={getListsRequest}
														{...props}
													/>;
												}}/>

												{/*<Route path='/list/:id/new' component={Form}/>*/}
												<Route path="/list/:id/new" render={props => {
													return <Form addItemRequest={addItemRequest} {...props}/>;
												}}/>

												{/*<Route path='/list/:id' component={List}/>*/}
												<Route path="/list/:id" render={props => {
													return list && items && <List
														list={list}
														listItems={items}
														loading={itemsLoading}
														error={itemsError}
														getItemsRequest={getItemsRequest}
														getListRequest={getListRequest}
														{...props}/>;
												}}/>
											</Switch>
										);
									}}
								</ItemsContext.Consumer>
							);
						}}
					</ListsContext.Consumer>
				</ItemsContextProvider>
			</ListContextProvider>
		</AppWrapper>
	</>
);

export default App;