import { Router } from "express";
import { chatController } from "../../adapters";

const router = Router();

router.get("/get-chat/:userId/:companyId",
  (req, res, next) =>
  chatController.getChat(req, res, next)
);

router.get("/get-company-chat/:companyId",
  (req, res, next) =>
  chatController.getCompanyChat(req, res, next)
);

router.get("/get-booked-users/:companyId",
  (req, res, next) =>
  chatController.getBookedUSersChat(req, res, next)
);

export default router;
