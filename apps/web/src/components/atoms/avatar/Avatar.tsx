import Image from "next/image";

export type ImageProps = {
    src:string;
    size?:"sm" | "md" ;

}
const Avatar = (props:ImageProps)=> {
    const {src,size} = props || {}
    const sizeClasses = {
      sm: "h-10 w-12", 
      md: "h-16 w-12", 
    };
  
    return (
      <Image
        src={src}
        width={size === "sm" ? 40 : 48} 
        height={size === "sm" ? 40 : 48} 
        alt="avatar"
        className={`rounded-full object-contain ${sizeClasses[size ? size:"sm"]}`}
      />
    );
}

export default Avatar;