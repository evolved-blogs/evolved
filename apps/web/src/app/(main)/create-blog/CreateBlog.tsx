import { Box } from "@src/components/common/box";
import { TextEditor } from "@src/components/common/text-editor";

const CreateBlog = () => {
  return (
    <Box className="p-4">
      <h1 className="text-3xl font-bold mb-4">Create a New Blog Post</h1>
      <p className="text-lg mb-6">
        Share your thoughts, ideas, and stories with the world. Use the rich
        text editor below to craft your blog post. You can format your text, add
        links, images, and more to make your post engaging and visually
        appealing.
      </p>
      <TextEditor />
    </Box>
  );
};

export default CreateBlog;
