import React,{useState,useEffect} from 'react';
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber,setChildCommentNumber] = useState(0)
    const [OpenReplyComments,setOpenReplyComments] = useState(false)
    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNumber ++;
                setChildCommentNumber(commentNumber);
            }
        })
    },[props.commentLists])
    

    const renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment,index)=>(
            <React.Fragment key={index}>
            {
                comment.responseTo === parentCommentId && 
                <div style={{width: '80%', marginLeft: '40px'}}>
                    <SingleComment refresFunction={props.refresFunction}  
                                    comment={comment} 
                                    postId={props.postId} 
                                    />
                    <ReplyComment refresFunction={props.refresFunction}  
                                parentCommentId={comment._id} 
                                postId={props.postId} 
                                commentLists={props.commentLists}  
                    />
                </div>            
            }               
            </React.Fragment>
        ))
    

    const onHandleChange =() =>{
        console.log(OpenReplyComments)
        setOpenReplyComments(!OpenReplyComments)
    }
    
  
  return (
  <div> 
      {ChildCommentNumber >0 &&
            <p style={{fontsize:'14px' , margin:0, color:'gray'}} onClick={onHandleChange}>
                View {ChildCommentNumber} More comment(s)
            </p>
      }

    {OpenReplyComments && 
        renderReplyComment(props.parentCommentId)
    }      
  </div>
  );
}

export default ReplyComment;
