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
    cardImage,
    footerAvatar,
    authorName
 
  } = props || {};

  const handleOnClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };


  return (
    <div className="rounded-xl shadow-xl max-w-md min-h-[356px] md:p-2 p-2 flex flex-col md:gap-4 gap-2 group m-auto cursor-pointer position-relative" onClick={handleOnClick}>
      <div className="p-0">
        <div className="overflow-hidden rounded">
          {cardImage && (
            <Image
              src={cardImage}
              alt="Card Image"
              width={460}
              height={460}
              className="object-fill w-full  h-44 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110 group-hover:scale-110"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col md:gap-4 gap-2 p-1">
        <div className="bg-violet-50 px-3 py-1 w-fit text-indigo-500 font-medium rounded-lg lg:text-sm text-xs">
          {badge}
        </div>
        <div className="p-0 text-base font-semibold lg:text-md  overflow-hidden line-clamp-2">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-2 p-1.5 mt-auto">
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


 