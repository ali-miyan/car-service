import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { notifyError, notifySuccess } from "../../common/Toast";
import { errMessage } from "../../../constants/errorMessage";
import { validateInput } from "../../../helpers/userValidation";
import { useEditUserMutation } from "../../../store/slices/userApiSlice";
import { getInitialToken } from "../../../helpers/getToken";

interface EditProfileModalProps {
  onClose: () => void;
  currentUsername?: string;
  currentPhone?: string;
  refetch: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
  currentUsername,
  currentPhone,
  refetch
}) => {
  const [editUser] = useEditUserMutation({});

  const token = getInitialToken('userToken')

  const [username, setUsername] = useState(currentUsername || "");
  const [phone, setPhone] = useState(currentPhone || "");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    setUsername(currentUsername || "");
    setPhone(currentPhone || "");
  }, [currentUsername, currentPhone]);

  const handleUpdate = async () => {
    const phoneError = phone ? validateInput("phone", phone) : "";
    const nameError = validateInput("username", username);

    setUsernameError(nameError);
    setPhoneError(phoneError);

    if (phoneError || nameError) {
      return;
    }

    try {
      const res = await editUser({
        id:token,
        username,
        phone: phone === "" ? null : phone,
      }).unwrap();
      if (res.success) {
        notifySuccess("Profile updated successfully");
        await refetch()
      }
      onClose();
    } catch (error) {
      console.error("Failed to update profile", error);
      notifyError(errMessage);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-end items-center">
          <FiX className="cursor-pointer text-end" onClick={onClose} />
        </div>
        <h2 className="text-md font-bold text-center uppercase mb-2">
          Edit Profile
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-xs mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-1 border rounded-lg"
          />
          {usernameError && (
            <p className="text-red-500 text-xs">{usernameError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xs mb-2">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Add your phone here"
            className="w-full px-4 py-1 border rounded-lg"
          />
          {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-1 bg-gray-900 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-red-900 text-white rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
