import Sidebar from "../../components/company/SideBar";
import Service from "../../components/company/Services";

const RegisterPage3 = () => {
  return (
    <>
      <Sidebar>
        <div className="w-full min-h-screen h-full bg-gray-200">
          <h1 className="text-center pt-6 font-bai-bold underline underline-offset-2 text-xl ">
            SERVICES
          </h1>
          <Service />
        </div>
      </Sidebar>
    </>
  );
};

export default RegisterPage3;
