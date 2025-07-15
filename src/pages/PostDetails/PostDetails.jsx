import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';

const PostDetails = () => {
    const {id} = useParams();

    // fetch post details
    const {data: post, isLoading} = useQuery({
        queryKey: ['post', id],
        queryFn: 
    })


    return (
        <div className='w-11/12 mx-auto py-24'>
            posts details:{id}
        </div>
    );
};

export default PostDetails;