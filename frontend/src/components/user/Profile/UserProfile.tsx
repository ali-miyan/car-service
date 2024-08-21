import React, { useState, useEffect, useRef, useCallback } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { GiMechanicGarage } from "react-icons/gi";

import { useLocation, useNavigate } from "react-router-dom";
import {
  FiSettings,
  FiLogOut,
  FiPackage,
  FiMapPin,
  FiTool,
  FiEdit2,
} from "react-icons/fi";
import UserCar from "./UserCar";
import Garage from "./Garage";
import Wallet from "./Wallet";
import ProfileSettings from "./ProfileSettings";
import {
  useGetUserByIdQuery,
  useUploadImageMutation,
} from "../../../store/slices/userApiSlice";
import { getInitialToken } from "../../../helpers/getToken";
import { notifyError, notifySuccess } from "../../common/Toast";
import { errMessage } from "../../../constants/errorMessage";
import EditProfileModal from "./EditProfileModal";
import DeleteConfirmationModal from "../../common/ConfirmationModal";
import { RiMailCheckLine } from "react-icons/ri";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSection = queryParams.get("section") || "services";

  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [newProfileImg, setNewProfileImg] = useState<string | null>(null);
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const { data: posts, refetch } = useGetUserByIdQuery(
    getInitialToken("userToken") as string
  );
  const [uploadImage, { isLoading }] = useUploadImageMutation({});

  const renderSection = useCallback(() => {
    switch (selectedSection) {
      case "car":
        return <UserCar />;
      case "garage":
        return <Garage />;
      case "address":
        return <Wallet />;
      case "settings":
        return <ProfileSettings />;
      default:
        return <UserCar />;
    }
  }, [selectedSection]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    []
  );

  const handleUpload = useCallback(async () => {
    if (file) {
      const form = new FormData();
      form.append("id", getInitialToken("userToken") as string);
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
  }, [file, uploadImage]);

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

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    navigate(`/profile?section=${section}`);
  };

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
        <ul className="flex flex-col gap-3 uppercase font-bai-bold text-xs">
          <li
            className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
              selectedSection === "car" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => handleSectionChange("car")}
          >
            <GiMechanicGarage size={24} />
            <span>My Car</span>
          </li>
          <li
            className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
              selectedSection === "garage" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => handleSectionChange("garage")}
          >
            <RiMailCheckLine size={24} />
            <span>My Bookings</span>
          </li>
          <li
            className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
              selectedSection === "address" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => handleSectionChange("address")}
          >
            <CiCreditCard1 size={24} />
            <span>My Wallet</span>
          </li>
          <li
            className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
              selectedSection === "settings" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => handleSectionChange("settings")}
          >
            <FiSettings size={24} />
            <span>Profile Settings</span>
          </li>
          <DeleteConfirmationModal
            body="Are you sure you want to logout?"
            onConfirm={handleLogout}
          >
            <li
              className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
                selectedSection === "logout" ? "bg-red-100" : "hover:bg-red-100"
              }`}
              onClick={() => handleSectionChange("logout")}
            >
              <FiLogOut size={24} />
              <span>Log-Out</span>
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
