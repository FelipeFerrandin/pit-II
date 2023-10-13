import {HttpException, HttpStatus} from "@nestjs/common"

export class InvalidUrlParameterException extends HttpException {
    constructor(message?: string) {
        super(message, HttpStatus.BAD_REQUEST)
    }
}