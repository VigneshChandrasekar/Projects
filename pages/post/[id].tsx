import React from "react";
import { useRouter } from "next/router";

interface PostProps{
    post:{
        id: string,
        title: string
    }
};

const Post:React.FC<PostProps> = ({post}) => {
    const {query} = useRouter();
    return (
        <>
        <p>Post: {query.id}</p>
        <h2>{post.title}</h2>
        </>
    )
};

export async function getStaticPaths() {
    return {
        paths: [
            {params: {id: '1'}},
            {params: {id: '2'}},
            {params: {id: '3'}},
        ], fallback: false
    }
};

export async function getStaticProps({params}: any) {
    return {
        props: {
            post: {
                id: params.id,
                title: `Post ${params.id} title`
            }
        }
    }
};

export default Post;