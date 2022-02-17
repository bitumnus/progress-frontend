import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ContainerList from "./Components/ContainerList";

function App() {
    const [list, setList] = useState([]);

    useEffect( () => {
        const listFromStore = localStorage.getItem('list');
        if (listFromStore) {
            return setList(JSON.parse(listFromStore));
        }

        async function fetchData() {
            localStorage.setItem('checkedList', '');
            const response = await axios.get('http://localhost:3000/api/v1/getList');
            setList(response.data);
            localStorage.setItem('list', JSON.stringify(response.data));
        }
        fetchData();
    }, [])
    return (
        <div className='app'>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className='title'>My startup progress:</div>
                    { list && <ContainerList checkList={list} /> }
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
