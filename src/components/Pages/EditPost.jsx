import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    appwriteService.getPost(slug).then((post) => {
      if (post) {
        setPosts(post);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  return posts ? (
    <div className="py-8">
      <Container>
        <PostForm post={posts} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
