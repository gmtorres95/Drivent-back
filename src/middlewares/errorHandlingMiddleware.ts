import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import InvalidEmailError from "@/errors/InvalidEmail";
import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import InvalidDataError from "@/errors/InvalidData";
import ConflictError from "@/errors/ConflictError";
import UnauthorizedError from "@/errors/Unauthorized";
import NotFoundError from "@/errors/NotFoundError";
import CannotBookBeforePayment from "@/errors/CannotBookBeforePayment";
import RoomNotFound from "@/errors/RoomNotFound";
import InvalidTicketType from "@/errors/InvalidTicketType";
import UserAlreadyWithTicket from "@/errors/UserAlreadyWithTicket";
import EventIsFull from "@/errors/EventIsFull";
import ConflictInTimeActivity from "@/errors/ConflictInTimeActivity";

/* eslint-disable-next-line */
export default function errorHandlingMiddleware (err: Error, _req: Request, res: Response, _next: NextFunction) {

  /* eslint-disable-next-line */
  console.error(err);
  if (err instanceof InvalidEmailError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }
  if(err instanceof ConflictInTimeActivity) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    });
  }
  if(err instanceof EventIsFull) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    });
  }
  if(err instanceof InvalidTicketType) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }
  if(err instanceof UserAlreadyWithTicket) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    });
  }

  if (err instanceof CannotEnrollBeforeStartDateError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }

  if (err instanceof CannotBookBeforePayment) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }

  if (err instanceof RoomNotFound) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }

  if (err instanceof InvalidDataError) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
      details: err.details
    });
  }

  if (err instanceof ConflictError) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message
    });
  }
  
  if (err instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!"
  });
}
