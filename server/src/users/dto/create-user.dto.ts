import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsString({message: "E-mail должен быть строкой!"})
    @Length(5, 32, {message: "E-mail должен быть от 5 до 32 символов!"})
    @IsEmail({}, {message: "Некорректный e-mail"})
    readonly email: string;

    @IsString({message: "Пароль должен быть строкой!"})
    @Length(5, 32, {message: "Пароль должен быть от 5 до 32 символов!"})
    readonly password: string;

    @IsString({message: "Имя должено быть строкой!"})
    @Length(1, 16, {message: "Имя должно быть не больше 16 символов!"})
    readonly name: string;
}
