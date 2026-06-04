export const prefixQuery=(value)=>{
  if(!value){
    return ""
  }
  let words = value.trim().split(/\s+/);
  let parts = [];
  for (let i = 0; i < words.length; i++) {
    parts.push(words[i] + ':*');
  }
  return parts.join(' & ');
}
