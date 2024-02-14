import { useDispatch, useSelector } from "react-redux";
import { edit } from "../store/AuthSlice";
import { HiX } from "react-icons/hi";

function EditPassModal({ setShowPssModal, username }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const handelChangPass = (e) => {
    e.preventDefault();
    const { oldPass, newPass, confNewPass } = e.target;
    if (newPass.value == confNewPass.value) {
      const PassObj = {
        oldPass: oldPass.value,
        newPass: newPass.value,
        confNewPass: confNewPass.value,
        username: username,
      };
      setShowPssModal(false);
      dispatch(edit(PassObj));
    } else {
      console.log("field Require");
    }
    console.log(users);
  };
  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-md w-72">
        <button
          type="button"
          className="text-red-800 ml-60"
          onClick={() => setShowPssModal(false)}
        >
          <HiX />
        </button>

        <form onSubmit={handelChangPass} className="flex flex-col space-y-4">
          <label
            htmlFor="oldPass"
            className="text-sm font-medium text-slate-800"
          >
            Old password
          </label>
          <input
            type="password"
            name="OldPass"
            id="oldPass"
            className="border border-gray-400 rounded-md p-2"
            required
          />

          <label
            htmlFor="newPass"
            className="text-sm font-medium text-slate-800"
          >
            New password
          </label>
          <input
            type="password"
            name="newPass"
            id="newPass"
            className="border border-gray-400 rounded-md p-2"
            required
          />

          <label
            htmlFor="confNewPass"
            className="text-sm font-medium text-slate-800"
          >
            Confirm New password
          </label>
          <input
            type="password"
            name="confNewPass"
            id="confNewPass"
            className="border border-gray-400 rounded-md p-2"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPassModal;
