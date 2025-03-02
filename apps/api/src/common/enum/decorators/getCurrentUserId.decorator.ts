import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request: { user: { userId: number } } = context
      .switchToHttp()
      .getRequest();
    console.log('requesr', request.user);
    return request.user.userId;
  },
);
