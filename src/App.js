import './App.css';
import {useEffect, useState} from 'react'
import {Input, Table, TableRow, TableBody, TableHead, TableCell, Button, makeStyles} from '@material-ui/core';
import axios from 'axios';
import * as moment from 'moment';

const useStyles = makeStyles({
    inp: {
        width: '500px',
        paddingTop: '30px',
        paddingLeft: '10px'
    },
    table: {
        width: 700,
        margin: "15px auto"
    }
});

function App() {

    const [data, setData] = useState([]);
    const styles = useStyles();

    const handleInput = (e) => {
        axios.get('/search?value=' + e.target.value).then(response => {
            setData([] && response.data)
        })
    }

    useEffect(() => {
        axios.get('/search').then(response => {
            setData([] && response.data)
        })
    }, [])

    return (
        <div className="App">
            <Input className={"find"} onChange={handleInput} placeholder={"Input value"} classes={{
                root: styles.inp
            }}/>

            <Table classes={{root: styles.table}}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Firstname</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Birthday</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length !== 0 && data.map((user, index) => {
                        return <TableRow key={"key_" + (index + 1)}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user._source.firstname}</TableCell>
                            <TableCell>{user._source.lastname}</TableCell>
                            <TableCell>{user._source.email}</TableCell>
                            <TableCell>{moment(user._source.day_of_birth).format('DD.MM.YYYY')}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default App;
