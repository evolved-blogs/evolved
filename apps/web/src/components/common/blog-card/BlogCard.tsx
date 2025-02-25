import React from "react";
import Image from "next/image";
import { Text } from "@src/components/atoms/text";

const BlogCard: React.FC = () => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 bg-background text-foreground">
      <Image
        className="w-full rounded-xl"
        src="/assets/placeholder.png" // Replace with actual image
        alt="Blog Post"
        width={400}
        height={300}
        layout="responsive"
      />
      <span className="inline-block px-3 py-1 mt-4 text-sm font-semibold rounded-lg bg-primary5 text-primary">
        Technology
      </span>
      <Text as="h2" className="mt-2 text-xl font-bold" variant="secondary">
        The Impact of Technology on the Workplace: How Technology is Changing
      </Text>
      <div className="mt-4 flex items-center space-x-3">
        <Image
          className="w-8 h-8 rounded-full"
          src="/assets/placeholder.png" // Replace with actual avatar
          alt="Author"
          width={50}
          height={50}
        />
        <Text as="span" className="text-sm" variant="gray">
          Tracey Wilson • August 20, 2022
        </Text>
      </div>
    </div>
  );
};

export default BlogCard;
