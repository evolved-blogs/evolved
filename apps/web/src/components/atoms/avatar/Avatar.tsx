import Image from "next/image";

export type ImageProps = {
    src:string;
    size:"sm" | "md" ;

}
const Avatar = (props:ImageProps)=> {
    const {src,size} = props || {}
  return (
    <Image src={src} width={100} height={100} alt="avatar" className="rounded-full h-10 w-10 object-cover "/>
  )
}

export default Avatar;