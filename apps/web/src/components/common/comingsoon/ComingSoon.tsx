import React from "react";
import Text from "@src/components/atoms/text/Text";

const ComingSoon = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen text-center"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div>
        <Text variant="primary" size="5xl" as="h1" className="font-bold mb-4">
          Coming Soon
        </Text>
        <Text variant="secondary" size="xl" as="p" className="mb-8">
          We are working hard to bring you something amazing. Stay tuned!
        </Text>
      </div>
    </div>
  );
};

export default ComingSoon;
