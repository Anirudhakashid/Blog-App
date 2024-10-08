import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import fileservice from "../../appwrite/fileservice";
import parse from "html-react-parser";
import { Container,Button } from "../index";
import { Link } from "react-router-dom";

function Post() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const { slug } = useParams();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        fileservice.deletefile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2">
          <img
            src={fileservice.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl h-80 border"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button  className=" bg-yellow-600 mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
              <Link to={`/`} >
              <button className=" bg-green-600 mr-3 ml-3 px-2 py-2 rounded-md">
                  Save
              </button>
              </Link>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
