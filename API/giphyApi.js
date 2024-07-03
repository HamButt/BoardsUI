import axios from 'axios'
import React, {useState} from 'react'

export const giphyApi = async (gifSearchValue,limit,offset) =>{
    
    
    const gifUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.apiKey}&q=${gifSearchValue}&limit=${limit}&offset=${offset}&rating=g&lang=en`;
    return await axios.get(gifUrl)
    .then(response => {
                
                return response
            })
            .catch(error => {
                return error
            })
}