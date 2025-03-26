
import BlogPage from "../BlogPage";

const Blog = async ({params}:{
    params:Promise<{blog:string}>
}) => {

    const {blog} = await params;
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //       const response = await getBlogBySlug(slug);
    //       console.log("response", response);
    //     };
    //     fetchPosts();
    //   }, []);
    return (
       <BlogPage slug={blog}></BlogPage>
    )
}

export default Blog;