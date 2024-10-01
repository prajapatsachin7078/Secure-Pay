import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAccounts } from '../redux/accountSlice';

function useGetAllAccounts() {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.account);

    useEffect(() => {
        const fetchAllAccounts = async () => {
            try {
                // Construct the URL with the search query if it exists
                const queryParam = searchQuery ? `?filter=${encodeURIComponent(searchQuery)}` : '';
                const res = await axios.get(`http://localhost:3001/api/v1/user/bulk${queryParam}`, {
                    withCredentials: true, // Include cookies if needed
                });
                // Dispatch the fetched data to the Redux store
                dispatch(setAllAccounts(res.data.user)); 
                // console.log();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchAllAccounts();
    }, [dispatch, searchQuery]); // Run effect when dispatch or searchQuery changes

    return null; // This component doesn't render anything
}

export default useGetAllAccounts;
