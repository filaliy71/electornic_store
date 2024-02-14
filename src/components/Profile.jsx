import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import EditPassModal from "./EditPassModal";

function Profile() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const LogUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPssModal, setShowPssModal] = useState(false);

  useLayoutEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  console.log(showPssModal);
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 rounded-md shadow-md bg-white">
      <h2 className="text-3xl font-extrabold mb-4 text-slate-700">
        {LogUser.name}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <ul className="list-disc pl-4 text-slate-700">
            <li>
              <span className="font-bold">Email:</span> {LogUser.email}
            </li>
            <li>
              <span className="font-bold">Username:</span> {LogUser.username}
            </li>
            <li>
              <span className="font-bold">Phone:</span> {LogUser.phone}
            </li>
            <li>
              <span className="font-bold">Website:</span> {LogUser.website}
            </li>
          </ul>
        </div>
        <div>
          <ul className="list-disc pl-4 text-slate-700">
            <li>
              <span className="font-bold">Company:</span> {LogUser.company.name}
            </li>
            <li>
              <span className="font-bold">Address:</span> {LogUser.address.city}
              , {LogUser.address.street}, {LogUser.address.suite}
            </li>
            <li>
              <span className="font-bold">Password :</span>
              <span>
                {LogUser.pass
                  .split("")
                  .map(() => "•")
                  .join("")}
              </span>
              <button type="button" onClick={() => setShowPssModal(true)}>
                <HiPencilAlt />
              </button>
            </li>
          </ul>
        </div>
      </div>
      {showPssModal && (
        <EditPassModal
          setShowPssModal={setShowPssModal}
          username={LogUser.username}
        />
      )}
    </div>
  );
}

export default Profile;
