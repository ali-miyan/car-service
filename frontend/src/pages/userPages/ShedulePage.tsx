import MainLayout from '../../layouts/MainLayout'
import SheduleOrder from '../../components/user/OrderManagement/SheduleOrder'

const SetSpotPage = () => {
  return (
    <MainLayout>
      <div className='bg-gray-100'>
        <SheduleOrder />
      </div>
    </MainLayout>
  )
}

export default SetSpotPage