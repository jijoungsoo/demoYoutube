import Axios from 'axios';
import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    const [CommentValue,setCommentValue] = useState("");
    const handleChange = (event)=>{
        setCommentValue(event.currentTarget.value)

    }

    const user = useSelector(state=>state.user)

    const onSubmit = (event)=>{
        event.preventDefault(); //form 전송을 막음
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
        }
        Axios.post('/api/comment/saveComment',variables)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                props.refresFunction(response.data.result)
                setCommentValue("")
            } else {
                alert('코멘트를 저장하지 못했습니다.')
            }

        })
    }


  return (
  <div>
      <br />
      <p>Replies</p>

      {/* Comment Lists */}
      {props.commentLists && props.commentLists.map((comment,index)=>(
          (!comment.responseTo &&
            <React.Fragment key={index}>
                <SingleComment 
                                refresFunction={props.refresFunction}  
                                comment={comment} 
                                postId={props.postId} 
                />
                <ReplyComment  refresFunction={props.refresFunction}  
                               parentCommentId={comment._id}  
                               commentLists={props.commentLists} 
                               postId={props.postId} 
                               />
            </React.Fragment>
            
          )
          
      ))}
      


      {/* Root Comment Form */}
      <form style={{display: 'flex'}} onSubmit={onSubmit}>
          <textarea style={{width:'100%', borderRadius:'5px'}}
          onChange={handleChange}
          value={CommentValue}
          placeholder="코멘트를 작성해 주세요"
          />

          <br />
          <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>

      </form>

  </div>
  );
}

export default Comment;
