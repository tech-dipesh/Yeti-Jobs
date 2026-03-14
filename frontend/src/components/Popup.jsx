import { useState, useTransition } from "react";
import Buttoncomps from "./common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Inputcomps from "./common/Input"
import Textcomps from "./common/Textcomps"
import { createPortal } from "react-dom";
import { postUserSkills } from "../api/auth.user";
import useFetchData from "../hooks/useFetchData";
import validateText from "../auth/textValidate";
import Errorloading from "./common/Errorloading";
export default function Popup({ id, navigate, setOpen }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const { data, error: skilllerr, execute: addprofile } = useFetchData(postUserSkills)
  const submitSkill = async () => {
    const err = validateText(value);
    console.log('err', err)
    if (err) {
      return setError(err)
    }

    await addprofile({ id, skill: value })
    if (data) {
      setTimeout(() => {
        navigate(0)
      }, 50);
      return;
    }
  }
  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm">
        <Errorloading data={{ data: skilllerr || error }} />
        <div className="relative bg-gray-700 w-96 h-64 align p-6 rounded-lg shadow-lg flex flex-col gap-4">
          <FontAwesomeIcon icon={faXmark} className="absolute right-4 top-4 cursor-pointer" size="2xl" onClick={() => setOpen(false)} />
          <Textcomps content="Enter a Skill:" />
          <Inputcomps click={setValue} value={value} type="text" />
          <span onClick={submitSkill}><Buttoncomps values="Add Skill" color={'bg-red-500'} /></span>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}