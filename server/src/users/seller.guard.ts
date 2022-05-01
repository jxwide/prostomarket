import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SellerGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const header = req.headers.authorization.split(" ");
            const isBearer = header[0] == "Bearer";
            const token = header[1];

            if (!isBearer || !token)
                throw new UnauthorizedException({
                    message: "Вы не авторизованы",
                });

            let verify = await this.jwtService.verify(token);
            req.user = verify;
            if (verify.seller) {
                return true;
            } else throw new UnauthorizedException({ message: "Нет доступа" });
        } catch (e) {
            throw new UnauthorizedException({ message: "Нет доступа" });
        }
    }
}
