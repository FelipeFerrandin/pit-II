import {HttpException, HttpStatus} from "@nestjs/common"

export class FileManipulationException extends HttpException {
    constructor(message?: string) {
        super(message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
}