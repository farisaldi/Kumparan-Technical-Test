import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormComment } from '../comment/FormComment'
import { GetPostsList } from '../../redux/actions/post/GetPostsList';
import { GetCommentsList } from '../../redux/actions/comment/GetCommentsList';
import { DeleteComment } from '../../redux/actions/comment/DeleteComment';
import { DetailComment } from '../../redux/actions/comment/DetailComment';
import { Link, useParams } from 'react-router-dom'
import { ListGroup, Button } from 'react-bootstrap'

function CommentsList() {
    const [id, setId] = useState(0)

    const { GetCommentsListResult, 
            GetCommentsListLoading, 
            GetCommentsListError,
            DeleteCommentResult,
            EditCommentResult } = useSelector((state) => state.Comment)

    const { GetPostsListResult, 
            GetPostsListLoading, 
            GetPostsListError } = useSelector((state) => state.Post)

    const dispatch = useDispatch();
    const params = useParams();

    // const Post = GetPostsListResult.map((post, i)=>{
    //     if(i === params.userid ) {
    //         setId(i)
    //     }
    // })  

    useEffect(()=>{
        for(let i = 0; i < GetPostsListResult.length; i++ ) {
            if(GetPostsListResult[i]?.id == params.postid) {
                setId(i)
            }
        }
    },[GetPostsListResult])

    useEffect(() => {
        dispatch(GetPostsList(params.userid))
        dispatch(GetCommentsList(params.postid))
    }, [dispatch])

    useEffect(() => {
        dispatch(GetPostsList(params.userid))
        dispatch(GetCommentsList(params.postid))
    }, [DeleteCommentResult, dispatch])

    useEffect(() => {
        dispatch(GetPostsList(params.userid))
        dispatch(GetCommentsList(params.postid))
    }, [EditCommentResult,dispatch])

    console.log(id)

    return (
        <>
        <ListGroup>
            <h1>{GetPostsListResult[id]?.title}</h1>
            <p>{GetPostsListResult[id]?.body}</p>
            <hr />
            {GetCommentsListResult ? (
                GetCommentsListResult.map(comment => {
                    return (
                        <ListGroup.Item key={comment.id}>
                            <h6>{comment.name}</h6>
                            <br />
                            <p class="blockquote-footer">{comment.email}</p>
                            <p>{comment.body}</p>
                            <Button variant="outline-primary" type="button" onClick={() => dispatch(DetailComment(comment))}>Edit</Button>{" "}
                            <Button variant="outline-success" type="button" onClick={() => {
                                return (
                                    dispatch(DeleteComment(comment.id))
                                )
                            }}>Delete</Button>
                            {/* <Link to={`/Post/${user.id}`} className="ui blue inverted button">View Posts User</Link>
                            <Link to={`/Album/${user.id}`} className="ui violet inverted button">View Albums User</Link> */}
                            <hr />
                        </ListGroup.Item>

                    )
                })
            ) : GetCommentsListLoading ? (
                <p>Loading.....</p>
            ) : (
                <p>{GetCommentsListError ? GetCommentsListError : "Data Kosong"}</p>
            )}
        </ListGroup>
        <br/>
        <FormComment/>
        </>
    )
}

export { CommentsList }