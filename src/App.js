import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ContainerList from "./Components/ContainerList";

function App() {
    const [list, setList] = useState([]);
    const [fanFact, setFanFact] = useState('');

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
                    { list && <ContainerList checkList={list} setFanFact={setFanFact} /> }
                </CardContent>
            </Card>
            <CardActions>
                <Button size="small">{fanFact}</Button>
            </CardActions>
        </div>
    );
}

export default App;
