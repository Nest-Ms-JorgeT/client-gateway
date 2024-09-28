import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Response } from "express";

export type MyRpcError ={
    message: string;
    status: HttpStatus | string;
}

@Catch(RpcException)
export class MyRpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response= ctx.getResponse();
        const rpcError = exception.getError() as MyRpcError;
        console.log("asokdasokaspok",rpcError)

        rpcError.status = rpcError.status == 'error'? HttpStatus.INTERNAL_SERVER_ERROR : rpcError.status

        if (
            typeof rpcError === 'object' &&
            'status' in rpcError &&
            'message' in rpcError
          ) {
            const status = isNaN(+rpcError.status) ? 400 :+rpcError.status;
            return response.status(status).json(rpcError);
          }
      
          response.status(400).json({
            status: 400,
            message: rpcError,
          });

    }
}