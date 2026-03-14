const getOriginalFileName = (filename) => {
  const splitName=filename && filename?.split("/");
  const originalName = splitName && splitName[splitName?.length - 1];
  return originalName?.slice(37); 
};
export default getOriginalFileName;
