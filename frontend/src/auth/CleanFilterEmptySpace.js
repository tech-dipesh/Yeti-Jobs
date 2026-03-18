const CleanFilterEmptySpace=(value)=>{
  const output={};
  for(const eachKey in value){
    const eachValue=value[eachKey]
    if(eachValue!=="" && eachValue!==" "){
      output[eachKey]=value[eachKey]
    }
  }
  return output;
}
export default CleanFilterEmptySpace;