import React from 'react';
import { PostList } from '../components/PostList'
import { FormPost } from '../components/FormPost'

const PostPage = () => {
    return (
        <div>
            <div style={{ padding: "30px" }}>
                <PostList />
                <br />
                <FormPost />
            </div>
        </div>
    )
}

export default PostPage