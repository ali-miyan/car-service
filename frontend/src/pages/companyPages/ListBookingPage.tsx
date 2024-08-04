import Sidebar from "../../components/company/SideBar";
import ListBookings from "../../components/company/ListBookings";

const RegisterPage3 = () => {
  return (
    <>
      <Sidebar>

        <div className="w-full min-h-screen h-full bg-gray-200">
          <h1 className="text-center pt-6 font-bai-bold underline underline-offset-2 text-xl ">
            Notification
          </h1>
          <ListBookings />
        </div>
      </Sidebar>
    </>
  );
};

export default RegisterPage3;
