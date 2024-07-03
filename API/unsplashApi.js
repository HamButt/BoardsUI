
import axios from 'axios' 
import React, {useState} from 'react'
export const unsplashApi = async (imageSearchValue, imagePage) => {
    
    console.log(imageSearchValue, imagePage);

    const params = {
        query: imageSearchValue,
        page:  imagePage,
        per_page: 12,
        client_id: process.env.clientId,
        orientation: 'portrait',
    };
    
    return await axios.get(process.env.unsplashUrl, { params })
    .then(response => {
                return response
            })
            .catch(error =>{ 
                return error
            })
}