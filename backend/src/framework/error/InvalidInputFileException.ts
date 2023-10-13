import {HttpException, HttpStatus} from "@nestjs/common"

export class InvalidInputFileException extends HttpException {
    constructor(message?: string) {
        super(message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
}