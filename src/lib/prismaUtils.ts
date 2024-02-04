import { Prisma } from "@prisma/client";

// https://www.prisma.io/docs/orm/reference/error-reference
// https://stackoverflow.com/a/75600318/608312
const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError) => {
  switch (err.code) {
    case "P2002":
      return new Error(
        `${err.meta.target}: The chosen ${err.meta.target} is already in use, please try another.`,
      );
    case "P2003":
      return new Error(
        `${err.meta.target}: The entered ${err.meta.target} doesn't match, please check it is correct and try again.`,
      );
    case "P2025":
      return new Error(
        `${err.meta.target}: The record searched for in the where condition (${err.meta.cause}) does not exist.`,
      );
    default:
      return new Error(
        `${err.meta.target}: Something went wrong whilst saving, please check the form for errors.`,
      );
  }
};

export const withFieldMappedErrors = <
  T extends (...args: any[]) => Promise<any>,
>(
  fn: T,
) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        const handledError = handlePrismaError(e);
        if (handledError != null) {
          throw handledError;
        }
      }
      throw e;
    }
  };
};
