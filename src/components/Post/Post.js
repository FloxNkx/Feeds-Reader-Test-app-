import api from "../../services/api";
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";

import "./Post.css";

export default function Post() {
    const [post, setPost] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        getPostData();
    }, []);

    const getPostData = async () => {
        let item = await api.getPostById(id);
        setPost(item);
    }

    return (
        <div className="post-page">
            <h1 class="post-user">UserID: 
                <span>
                    {post.id}
                </span>
            </h1>
            <div className="post-details">
                <h1>Item title: 
                    <span>
                        {post.title}
                    </span>
                </h1>
                <h2>Item body: 
                    <span>
                        {post.body}
                    </span>
                </h2>
            </div>
        </div>
    );
}