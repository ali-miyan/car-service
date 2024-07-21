import React, { useState, useRef } from 'react';
import { FiSettings, FiLogOut, FiUser, FiPackage, FiMapPin, FiTool, FiEdit2 } from 'react-icons/fi';
import UserCar from './UserCar';
import Garage from './Garage';
import Address from './Addresses';
import ProfileSettings from './ProfileSettings';
import { useGetUserByIdQuery, useUploadImageMutation } from '../../store/slices/userApiSlice';
import { getInitialToken } from '../../helpers/getToken';

const Profile = () => {
  const token = getInitialToken('userToken');
  const { data: posts } = useGetUserByIdQuery(token as string);
  const [uploadImage, { isLoading }] = useUploadImageMutation({})

  const [selectedSection, setSelectedSection] = useState('services');
  const [newProfileImg, setNewProfileImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const renderSection = () => {
    switch (selectedSection) {
      case 'car':
        return <UserCar />;
      case 'garage':
        return <Garage />;
      case 'address':
        return <Address />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <UserCar />;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (newProfileImg) {
      const form = new FormData();
      console.log(file, 'seen');

      form.append('id', token as string)
      form.append('image', file as File)
      setNewProfileImg(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      const response = await uploadImage(form).unwrap();
      console.log(response, 'response');
    }
  };

  const handleCancel = () => {
    setNewProfileImg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col font-bai-regular lowercase md:flex-row gap-8 my-8 md:my-32 w-full px-4 md:px-10">
      <div className="w-full md:w-3/12 lg:w-2/12 bg-gray-100 p-6 rounded-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer">
            <label htmlFor="profile-image-input" className="cursor-pointer w-full h-full">
              <img
                src={newProfileImg || posts?.profileImg || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <FiEdit2 className="text-white" size={20} />
              </div>
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
          <p className="text-gray-700 font-medium uppercase mt-2">HELLO {posts?.username}</p>
          {newProfileImg && (
            <div className="flex gap-2 mt-2">
              <button
                className="px-2 py-1 text-sm bg-gray-800 text-white rounded"
                onClick={handleCancel}
              >
                cancel
              </button>
              <button
                className="px-2 py-1 text-sm bg-red-900 text-white rounded"
                onClick={handleUpload}
              >
                ok
              </button>
            </div>
          )}
        </div>
        <ul className="flex flex-col gap-3 lowercase font-normal">
          <li
            className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer"
            onClick={() => setSelectedSection('car')}
          >
            <FiPackage size={24} color="#718096" />
            <span className='font-bai-medium'>My car</span>
          </li>
          <li
            className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer"
            onClick={() => setSelectedSection('garage')}
          >
            <FiTool size={24} color="#718096" />
            <span className='font-bai-medium'>My Garage</span>
          </li>
          <li
            className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer"
            onClick={() => setSelectedSection('address')}
          >
            <FiMapPin size={24} color="#718096" />
            <span className='font-bai-medium'>My Address</span>
          </li>
          <li
            className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer"
            onClick={() => setSelectedSection('settings')}
          >
            <FiSettings size={24} color="#718096" />
            <span className='font-bai-medium'>Profile Settings</span>
          </li>
          <li
            className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer"
            onClick={() => setSelectedSection('logout')}
          >
            <FiLogOut size={24} color="#718096" />
            <span className='font-bai-medium'>Log-Out</span>
          </li>
        </ul>
      </div>
      <div className="flex-1 w-full">
        {renderSection()}
      </div>
    </div>
  );
};

export default Profile;
