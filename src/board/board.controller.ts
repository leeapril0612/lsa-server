import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('board')
export class BoardController {

    @Get('/list')
    public async getBoards(){
        return 'getBoards';
    }

    @Get('/:id')
    public async getBoard(){
        return 'getBoard';
    }

    @Post()
    public async createBoard(){
        return 'create-board';
    }

    @Put('/:id')
    public async updateBoards(){
        return 'update-boards';
    }
}
