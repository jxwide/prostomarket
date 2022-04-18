import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString({ message: "Должно быть строкой!" })
    @Length(5, 32, { message: "Должно быть от 5 до 32 символов!" })
    @IsEmail({}, { message: "Это не E-mail!" })
    readonly email: string;

    @IsString({ message: "Должно быть строкой!" })
    @Length(5, 32, { message: "Должно быть от 5 до 32 символов!" })
    readonly password: string;
}
