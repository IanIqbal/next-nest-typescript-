import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // const error : any = exception.getError()

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let message = exception.getError()

    console.log(message);
    
    // You can further customize the status code and the response based on the exception message or error code
    const status = HttpStatus.BAD_REQUEST;
    console.log("rpc exception");
    
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}