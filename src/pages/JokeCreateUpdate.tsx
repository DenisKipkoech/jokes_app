import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom'
import { baseGet } from '../services/api';
import { Container, Typography } from '@mui/material';
import JokesForm from '../sections/JokesForm';

type Joke = {
    id?: number;
    title?: string;
    author?: string;
    createdAt?: string;
    views?: number;
};

// type JokeInfo = {
//     id?: number;
//     Title?: string;
//     Author?: string;
//     CreatedAt?: number;
//     Views?: number;
// };


export default function JokeCreateUpdate() {
    const { pathname } = useLocation();

    const {id = ''} = useParams();

    const [joke, setJoke] = useState<Joke>({
        title:'',
        author:'',
        createdAt:'',
        views:0,
    });

    const isEdit = pathname.includes('edit');

    const fetchJoke = useQuery(
        ['get_joke', id],
        () => baseGet(`/${id}`),
        {
            refetchOnWindowFocus: false,
            enabled: isEdit,
            onSuccess: (data) => {
                const info:Joke = data.data;
                // console.log(info);
                // setJoke({
                //     id: info?.id,
                //     title: info.Title,
                //     author: info.Author,
                //     createdAt: info.CreatedAt,
                //     views: info.Views
                // })
                setJoke(info)
            },
            onError: () => alert('Failed to get joke!'),
        }
    )


  return (
    <Container maxWidth="lg">
        <br />
        <Typography variant='h4' paragraph>{isEdit ? `Edit ${joke?.title}` : 'Add New Joke'}</Typography>

        <JokesForm isEdit={isEdit} joke={joke} loading={fetchJoke.isLoading}/>

    </Container>
  )
}
