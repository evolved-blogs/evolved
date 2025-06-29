"use client";
import { Avatar } from "@src/components/atoms/avatar";
import { Box } from "@src/components/common/box";
import { getBlogBySlug } from "@src/services";
import { formatDate } from "@src/utils/formatDate";
import { useEffect, useState } from "react";

const BlogPage = ({ slug }: { slug: string }) => {
  console.log("slug", slug);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getBlogBySlug(slug);
      console.log("response", response);
      setPosts(response);
    };
    fetchPosts();
  }, [slug]);

  const { title, content, thumbnail, author, createdAt } = posts || {};

  const { avatar, firstName, lastName } = author || {};
  return (
    <Box>
      <div className="flex items-center gap-2 mt-20 mb-4">
        <Avatar
          src="https://miro.medium.com/v2/resize:fit:700/1*XuF9MnNzY2OXJqPptzey-w.png"
          size="sm"
        />
        <div>
          <h4 className="font-bold">
            {firstName} {lastName}
          </h4>
          <span className="text-slate-500">
           Published on {formatDate(createdAt)}
          </span>
        </div>
      </div>
      <h1 className="text-title font-thin mb-10">{title}</h1>

      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Box>
  );
};

export default BlogPage;
