import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { BusDto } from './dto/bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Controller('buses')
@ApiTags('buses')
export class BusesController {
  constructor(private busesService: BusesService) {}

  async checkBusExistance(id: string) {
    const oldBus = await this.busesService.findOne(id);
    if (!oldBus) {
      throw new BadRequestException('Bus is invalid or not exist');
    }
    return oldBus;
  }

  @Get()
  @ApiOkResponse({ type: [BusDto] })
  findAll(): Promise<BusDto[]> {
    return this.busesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BusDto })
  @ApiResponse({ status: 400, description: 'Record not exist' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<BusDto> {
    return this.checkBusExistance(id);
  }

  @Post()
  @ApiCreatedResponse({ type: BusDto })
  create(@Body() createBusDto: CreateBusDto): Promise<BusDto> {
    return this.busesService.createBus(createBusDto);
  }
  @Patch(':id')
  @ApiOkResponse({ type: BusDto })
  @ApiResponse({ status: 400, description: 'Record not exist' })
  @ApiParam({ name: 'id', required: true })
  async editBus(
    @Body() updateBusDto: UpdateBusDto,
    @Param('id') id: string,
  ): Promise<BusDto> {
    await this.checkBusExistance(id);
    return this.busesService.editBus(id, updateBusDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Record not exist' })
  @ApiParam({ name: 'id', required: true })
  async remove(@Param('id', ParseUUIDPipe) id) {
    await this.checkBusExistance(id);
    await this.busesService.remove(id);
    return 'The record has been successfully deleted.';
  }
}
