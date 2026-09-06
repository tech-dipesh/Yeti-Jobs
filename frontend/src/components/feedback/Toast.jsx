import { Bounce, ToastContainer } from "react-toastify";
export default function ToastConataine() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={1}
      theme="dark"
      transition={Bounce}
    />
  )
}
