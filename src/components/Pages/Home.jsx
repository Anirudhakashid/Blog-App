import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from "../index";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);

  const userData = useSelector((state) => state.auth.userData);

  if (userData) {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center flex justify-center">
        <Container>
          <div className="flex flex-wrap  ">
            <div className=" flex  justify-center items-center p-2 w-full">
              <h1 className="text-2xl font-bold">Login to read posts</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
