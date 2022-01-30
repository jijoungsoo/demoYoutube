import Axios from 'axios';
import React,{useState} from 'react';
import {Comment,Avatar,Button,Input} from 'antd'
import {useSelector} from 'react-redux'
import LikeDislikes from './LikeDislikes'


function SingleComment(props) {

    const [OpenReply,setOpenReply] = useState(false)
    const [CommentValue,setCommentValue] = useState("");
    const user = useSelector(state=>state.user)


    const onHandleChange = (event)=>{
        setCommentValue(event.currentTarget.value)

    }

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const actions = [
        <span onClick={onClickReplyOpen} key={"comment-basic-reply-to"}>Reply to</span>
    ]

    const onSubmit = (event)=>{
        event.preventDefault(); //form 전송을 막음
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo : props.comment._id
            
        }
        Axios.post('/api/comment/saveComment',variables)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setCommentValue("")
                setOpenReply(false)
                props.refresFunction(response.data.result)
                
            } else {
                alert('코멘트를 저장하지 못했습니다.')
            }

        })
    }
    
  
  return (
  <div> 
      <Comment 
        actions={[<LikeDislikes commentId={props.comment._id} userId={localStorage.getItem('userId')} />,actions]}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt/>}
        content={<p>{props.comment.content}</p>}
      />
{OpenReply  && <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea style={{width:'100%', borderRadius:'5px'}}
                onChange={onHandleChange}
                value={CommentValue}
                placeholder="코멘트를 작성해 주세요"
                />

                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>

            </form>
}      
  </div>
  );
}

export default SingleComment;
