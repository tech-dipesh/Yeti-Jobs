import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import Errorloading from "./common/Errorloading";
export default function Popup({ setOpen, error, fetchError, children, header, height, width }) {

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm">
        <div className={`relative bg-gray-700 ${height} ${width}  min-w-96 min-h-64 max-w-[90vw] max-h-[90vh] overflow-auto align p-6 rounded-lg shadow-lg flex flex-col gap-4`}>
          <FontAwesomeIcon icon={faXmark} className="absolute right-4 top-4 cursor-pointer" size="2xl" onClick={() => setOpen(false)} />
          {header}
        <Errorloading data={{ error: error || fetchError  }} />
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}