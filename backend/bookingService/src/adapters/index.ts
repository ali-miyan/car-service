import {
  BookingUseCase,
  GetBookingUseCase,
  GetLiveLocationUseCase,
  GetDashboardUseCase,
  GetSingleBookingUseCase,
  GetUsersBookingUseCase,
  UpdateDriverLocationUseCase,
  UpdateStatusUseCase,
  CancelBookingUseCase,
  HandleStripeUseCase,
  RefundUseCase,
} from "../usecases";
import {
  BookingRepository,
  RedisOtpRepository,
  UserRepository,
} from "../repositories";
import { StripeService } from "../infrastructure/services";
import { RabbitMQService } from "../infrastructure/rabbitMQ";
import { BookingController } from "../adapters/bookingController";

export function createBookingController() {
  const bookingRepository = new BookingRepository();
  const redisRepository = new RedisOtpRepository();
  const userRepository = new UserRepository();
  const stripeService = new StripeService();
  const rabbitMQService = new RabbitMQService();

  const updateDriverLocationUseCase = new UpdateDriverLocationUseCase(
    redisRepository
  );
  const updateStatusUseCase = new UpdateStatusUseCase(bookingRepository);
  const getBookingUseCase = new GetBookingUseCase(bookingRepository);
  const cancelBookingUseCase = new CancelBookingUseCase(bookingRepository);
  const getSingleBookingUseCase = new GetSingleBookingUseCase(
    bookingRepository,
    userRepository
  );
  const getLiveLocationUseCase = new GetLiveLocationUseCase(redisRepository);
  const getUsersBookingUseCase = new GetUsersBookingUseCase(bookingRepository);
  const refundUseCase = new RefundUseCase(stripeService);
  const getMonthlyRevenueUseCase = new GetDashboardUseCase(
    bookingRepository,
    userRepository
  );
  const bookingUseCase = new BookingUseCase(
    bookingRepository,
    stripeService,
    rabbitMQService
  );
  const handleStripeUseCase = new HandleStripeUseCase(
    bookingRepository,
    rabbitMQService
  );

  return new BookingController(
    bookingUseCase,
    getBookingUseCase,
    getSingleBookingUseCase,
    updateStatusUseCase,
    getUsersBookingUseCase,
    updateDriverLocationUseCase,
    getLiveLocationUseCase,
    getMonthlyRevenueUseCase,
    cancelBookingUseCase,
    handleStripeUseCase,
    refundUseCase
  );
}
