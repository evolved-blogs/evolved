// import React from "react";
import Image from "next/image";
// import { Text } from "@src/components/atoms/text";

// const BlogCard: React.FC = () => {
//   return (
//     <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 bg-background text-foreground">
//       <Image
//         className="w-full rounded-xl"
//         src="/assets/placeholder.png" // Replace with actual image
//         alt="Blog Post"
//         width={400}
//         height={300}
//         layout="responsive"
//       />
//       <span className="inline-block px-3 py-1 mt-4 text-sm font-semibold rounded-lg bg-primary5 text-primary">
//         Technology
//       </span>
//       <Text as="h2" className="mt-2 text-xl font-bold" variant="secondary">
//         The Impact of Technology on the Workplace: How Technology is Changing
//       </Text>
//       <div className="mt-4 flex items-center space-x-3">
//         <Image
//           className="w-8 h-8 rounded-full"
//           src="/assets/placeholder.png" // Replace with actual avatar
//           alt="Author"
//           width={50}
//           height={50}
//         />
//         <Text as="span" className="text-sm" variant="gray">
//           Tracey Wilson • August 20, 2022
//         </Text>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;



type CardProps = {
  badge?: string;
  title: string;
  description: string;
  cardImage?: string;
  footerAvatar?: string;
  className?: string;
  onClick?: () => void;
};

const BlogCard = (props: CardProps) => {
  const {
    badge,
    title,
    description,
    cardImage,
    footerAvatar,
 
  } = props || {};
  return (
    <div className="rounded-xl shadow-lg max-w-md md:p-2 p-2 flex flex-col md:gap-4 gap-2 group m-auto">
      <div className="p-0">
        <div className="overflow-hidden rounded">
          {cardImage && (
            <Image
              src={cardImage}
              alt="Card Image"
              width={460}
              height={460}
              className="object-cover w-full  h-44 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110 group-hover:scale-110"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col md:gap-4 gap-2 p-1">
        <div className="bg-violet-50 px-3 py-1 w-fit text-indigo-500 font-medium rounded-lg lg:text-sm text-xs">
          {badge}
        </div>
        <div className="p-0 text-base lg:text-md  overflow-hidden line-clamp-2">
          {title}
        </div>
      </div>
      <div className="md:gap-3 gap-2 p-1.5">
        {footerAvatar && (
          <Image
            alt="icon"
            src={footerAvatar}
            height={30}
            width={30}
            className="rounded-full object-cover w-6 h-6"
          />
        )}
        <div className="p-0 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;


 