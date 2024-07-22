import React, { useState, useRef, useCallback } from "react";
import {
  FiSettings,
  FiLogOut,
  FiUser,
  FiPackage,
  FiMapPin,
  FiTool,
  FiEdit2,
} from "react-icons/fi";
import UserCar from "./UserCar";
import Garage from "./Garage";
import Address from "./Addresses";
import ProfileSettings from "./ProfileSettings";
import {
  useGetUserByIdQuery,
  useUploadImageMutation,
} from "../../store/slices/userApiSlice";
import { getInitialToken } from "../../helpers/getToken";
import { notifyError, notifySuccess } from "../common/Toast";
import { errMessage } from "../../constants/errorMessage";
import EditProfileModal from "./EditProfileModal";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../common/ConfirmationModal";

const Profile = () => {
  const token = getInitialToken("userToken");
  const { data: posts, refetch } = useGetUserByIdQuery(token as string);
  const [uploadImage, { isLoading }] = useUploadImageMutation({});

  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState("services");
  const [newProfileImg, setNewProfileImg] = useState<string | null>(null);
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const renderSection = useCallback(() => {
    switch (selectedSection) {
      case "car":
        return <UserCar />;
      case "garage":
        return <Garage />;
      case "address":
        return <Address />;
      case "settings":
        return <ProfileSettings />;
      default:
        return <UserCar />;
    }
  }, [selectedSection]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setShowCancel(true);
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImg(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (file) {
      const form = new FormData();
      form.append("id", token as string);
      form.append("image", file);

      try {
        const response = await uploadImage(form).unwrap();
        if (response.success) {
          notifySuccess("Image uploaded");
          setShowCancel(false);
        }
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Failed to upload image", error);
        notifyError(errMessage);
      }
    }
  }, [file, token, uploadImage]);

  const handleCancel = useCallback(() => {
    setNewProfileImg(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleLogout = useCallback(() => {
    document.cookie =
      "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  }, [navigate]);

  const handleEditClick = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  return (
    <div className="flex flex-col font-bai-regular lowercase md:flex-row gap-8 my-8 md:my-32 w-full px-4 md:px-10">
      <div className="w-full md:w-3/12 lg:w-2/12 bg-gray-100 p-6 rounded-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer">
            <label htmlFor="profile-image-input" className="cursor-pointer">
              <img
                src={
                  newProfileImg ||
                  posts?.profileImg ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </label>
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
          <div className="flex items-center text-xs gap-2 mt-2">
            <p className="text-gray-700">{posts?.username}</p>
          </div>
          <div className="flex items-center text-xs gap-2">
            <p className="text-gray-700">{posts?.email}</p>
          </div>
          <div className="flex items-center text-xs gap-2">
            <p className="text-gray-700">
              PH: {posts?.phone ? posts?.phone : "add a phone"}
            </p>
          </div>
          <FiEdit2 className="cursor-pointer" onClick={handleEditClick} />
          {showCancel && (
            <div className="flex gap-2 mt-2">
              <button
                className="px-2 py-1 text-sm bg-gray-800 text-white rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 text-sm bg-red-900 text-white rounded"
                onClick={handleUpload}
              >
                OK
              </button>
            </div>
          )}
        </div>
        <ul className="flex flex-col gap-3 lowercase font-normal">
          <li
            className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
              selectedSection === "car" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => setSelectedSection("car")}
          >
            <FiPackage size={24} color="#718096" />
            <span className="font-bai-medium">My Car</span>
          </li>
          <li
            className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
              selectedSection === "garage" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => setSelectedSection("garage")}
          >
            <FiTool size={24} color="#718096" />
            <span className="font-bai-medium">My Garage</span>
          </li>
          <li
            className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
              selectedSection === "address" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => setSelectedSection("address")}
          >
            <FiMapPin size={24} color="#718096" />
            <span className="font-bai-medium">My Address</span>
          </li>
          <li
            className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
              selectedSection === "settings" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => setSelectedSection("settings")}
          >
            <FiSettings size={24} color="#718096" />
            <span className="font-bai-medium">Profile Settings</span>
          </li>
          <DeleteConfirmationModal
            body="Are you sure you want to logout?"
            onConfirm={handleLogout}
          >
            <li
              className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
                selectedSection === "logout" ? "bg-red-100" : "hover:bg-red-100"
              }`}
              onClick={() => setSelectedSection("logout")}
            >
              <FiLogOut size={24} color="#718096" />
              <span className="font-bai-medium">Log-Out</span>
            </li>
          </DeleteConfirmationModal>
        </ul>
      </div>
      <div className="flex-1 w-full">{renderSection()}</div>
      {isEditModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditModalOpen(false)}
          currentUsername={posts?.username}
          currentPhone={posts?.phone}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Profile;
