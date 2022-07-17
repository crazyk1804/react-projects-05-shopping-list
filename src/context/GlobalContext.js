import React from 'react';
import ListContextProvider from './ListContextProvider';
import ItemsContextProvider from "./ItemContextProvider";

const GlobalContext = ({ children }) => {
	return (
		<ListContextProvider>
			<ItemsContextProvider>
				{ children }
			</ItemsContextProvider>
		</ListContextProvider>
	);
};

export default GlobalContext;