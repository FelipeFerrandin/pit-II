import {Injectable} from "@nestjs/common"
import {PrismaService} from "./PrismaService"

@Injectable()
export class TransactionManager {

    constructor(private prismaDatabase: PrismaService) {}

     run = async (aFunction: () => Promise<void>) => {
        this.prismaDatabase.$transaction(aFunction).catch(console.error)
    }

}