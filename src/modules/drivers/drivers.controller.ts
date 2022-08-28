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
import { Driver, DriverGender } from './driver.entity';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDto } from './dto/driver.dto';
import { GroupDriversDto } from './dto/group-drivers.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
@ApiTags('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  async checkDriverExistance(id: string) {
    const oldDriver = await this.driversService.findOne(id);
    if (!oldDriver) {
      throw new BadRequestException('Driver is invalid or not exist');
    }
    return oldDriver;
  }

  @Get()
  @ApiOkResponse({ type: [DriverDto] })
  findAll(@Query() query: GroupDriversDto): Promise<DriverDto[]> {
    return this.driversService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: DriverDto })
  @ApiResponse({ status: 400, description: 'Record not exist' })
  @ApiParam({ name: 'id', required: true })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<DriverDto> {
    return this.checkDriverExistance(id);
  }

  @Post()
  @ApiCreatedResponse({ type: DriverDto })
  create(@Body() createDriverDto: CreateDriverDto): Promise<DriverDto> {
    return this.driversService.createDriver(createDriverDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DriverDto })
  @ApiResponse({ status: 400, description: 'Record not exist' })
  @ApiParam({ name: 'id', required: true })
  async editDriver(
    @Body() updateDriverDto: UpdateDriverDto,
    @Param('id') id: string,
  ): Promise<DriverDto> {
    await this.checkDriverExistance(id);

    return this.driversService.editDriver(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Record not exist' })
  @ApiParam({ name: 'id', required: true })
  async remove(@Param('id', ParseUUIDPipe) id) {
    await this.checkDriverExistance(id);
    await this.driversService.remove(id);
    return 'The record has been successfully deleted.';
  }
}
