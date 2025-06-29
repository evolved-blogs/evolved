import Image from "next/image";

type CardProps = {
  badge?: string;
  title: string;
  description: string;
  cardImage?: string;
  footerAvatar?: string;
  className?: string;
  authorName?: string;
  onClick?: () => void;
};

const BlogCard = (props: CardProps) => {
  const {
    badge,
    title,
    description,
    cardImage,
    footerAvatar,
    authorName,
    onClick,
  } = props || {};

  const handleOnClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className="rounded-xl max-w-sm w-full h-[370px] p-3 flex flex-col gap-2 group cursor-pointer"
      onClick={handleOnClick}
      style={{
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded h-40">
        {cardImage && (
          <Image
            src={cardImage}
            alt="Card Image"
            width={460}
            height={160}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 px-1 flex-grow">
        {badge && (
          <div className="bg-violet-50 px-3 py-1 w-fit text-indigo-500 font-medium rounded-lg text-xs">
            {badge}
          </div>
        )}

        <div className="text-base font-semibold overflow-hidden line-clamp-2">
          {title}
        </div>

        <div className="text-sm text-gray-600 overflow-hidden line-clamp-3">
          {description}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-1.5 mt-2">
        {footerAvatar && (
          <Image
            alt="icon"
            src={footerAvatar}
            height={30}
            width={30}
            className="rounded-full object-cover w-8 h-8"
          />
        )}
        <div className="text-xs font-medium text-gray-700">{authorName}</div>
      </div>
    </div>
  );
};

export default BlogCard;
