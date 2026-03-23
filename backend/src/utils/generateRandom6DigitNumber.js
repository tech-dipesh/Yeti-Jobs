export default function generateRandomNumber(){
  const val=Math.floor(Math.random()*(1000000-100000)+1)+100000
  return val;
}