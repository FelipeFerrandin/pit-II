import {Global, Module} from "@nestjs/common"
import {PrismaService} from "./PrismaService"
import {TransactionManager} from "./TransactionManager"

@Global()
@Module({
    providers: [PrismaService, TransactionManager],
    exports: [PrismaService, TransactionManager]
})
export class PrismaModule {
}
