export default function Textcomps({content, style,}){
  return <div className={`${style} text-gray-100 font-medium  hover:text-white transition-colors `}>{content}</div>
}