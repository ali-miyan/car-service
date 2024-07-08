import ProfilePage from "../../components/user/UserProfile";
import MainLayout from "../../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div>
        <ProfilePage />
      </div>
    </MainLayout>
  );
};

export default Home;
