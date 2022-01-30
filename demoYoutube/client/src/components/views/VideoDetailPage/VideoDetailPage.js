import React,{useEffect,useState} from 'react';
import {Row,Col, List} from 'antd'
import Axios from 'axios';
import Avatar from 'antd/lib/avatar/avatar';
import { useParams } from 'react-router-dom';
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'

function VideoDetailPage() {

    const { videoId } = useParams();   //  <== react-router-dom v6
    console.log(videoId)
    const variables = {videoId: videoId}

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([]);

    //const [Comment, setComment] = useState([]);

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail',variables)
        .then((response) => {
            if(response.data.success) {
                console.log(response.data)
                setVideoDetail(response.data.videoDetail)

            } else {
                alert('비디오 정보를 가져오길 실패했습니다.')
            }

        })

        Axios.post('/api/comment/getComment',variables)
        .then((response) => {
            if(response.data.success) {
                console.log(response.data)
                setComments(response.data.comments)

            } else {
                alert('코멘트정보를 가져오는것을 실패했습니다.')
            }

        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const refresFunction =(newComment) => {
        setComments(Comments.concat(newComment))

    }

    if(VideoDetail.writer){

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem("userId") && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
        return (<div>
                <Row gutters={[16,16]}>
                    <Col lg={18} xs={24}>
                        <div style={{width: '100%', padding:'3rem 4rem'}}>
                            <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
        
                            <List.Item
                            actions={[ <LikeDislikes  video  userId={localStorage.getItem('userId')} videoId={videoId} />, subscribeButton
                                ]}
                            >
                                
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer.image} /> }
                                    title={VideoDetail.title}
                                    
                                >
        
                                </List.Item.Meta>
        
                            </List.Item>

                            <Comment refresFunction={refresFunction} commentLists={Comments} postId={videoId} />
        
                        </div>
        
        
                    </Col>
                    <Col lg={6} xs={24}>
                          <SideVideo />
                    </Col>
                </Row>
            </div>)
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage;

