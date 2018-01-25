import { JsonController, UseBefore, Get, Post, Delete, Body, Param } from 'routing-controllers';
import { LeadModel } from '../../Common/Models/LeadModel';
import { TokenValidate } from '../Middleware/TokenValidate';
import { PaginatedSearchResultModel } from '../../Common/Models/PaginatedSearchResultModel';
import { LeadSearchCriteriaModel } from '../../Common/Models/LeadSearchCriteriaModel';
import { LeadRepository } from '../Repositories.Mock/LeadRepository';
import { ILeadRepository } from '../../Common/Interfaces/ILeadRepository';
import { ServiceLocator } from '../Framework/ServiceLocator';
import { LeadUnitOfWork } from '../UnitsOfWork/LeadUnitOfWork';

@JsonController('/Leads')
@UseBefore(TokenValidate)
export class LeadController {
    @Get('/:leadId')
    public Get( @Param('leadId') leadId: number): Promise<LeadModel> {
        let uow: LeadUnitOfWork = new LeadUnitOfWork();
        let response: Promise<LeadModel> = uow.Get(leadId);
        return response;
    }

    @Post('/Search')
    public Search( @Body() searchCriteria: LeadSearchCriteriaModel): Promise<PaginatedSearchResultModel> {
        let uow: LeadUnitOfWork = new LeadUnitOfWork();
        let response: Promise<PaginatedSearchResultModel> = uow.Search(searchCriteria);
        return response;
    }

    @Post()
    public Save( @Body() model: LeadModel): Promise<number> {
        let uow: LeadUnitOfWork = new LeadUnitOfWork();
        let response: Promise<number> = uow.Save(model);
        return response;
    }

    @Delete('/:leadId')
    public Delete( @Param('leadId') leadId: number): Promise<string> {
        let uow: LeadUnitOfWork = new LeadUnitOfWork();
        let response: Promise<string> = uow.Delete(leadId);
        return response;
    }
}
