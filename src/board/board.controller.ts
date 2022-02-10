import { Body, Controller, Delete, Get, Header, Logger, Param, Patch, Post,  Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqeustCreateBoard, UpdateBoard } from './board.type';
import { createBoardSchema } from './board.schema';
import { ValidationError } from 'joi';
import { ResponseMessage } from 'src/util/response.util';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService: BoardService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    public async getBoards() {
        try {
            const boards = await this.boardService.getBoards();

            return new ResponseMessage().success(200).body(boards)

        } catch (err) {
            Logger.error(err);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    public async getBoard(@Param('id') id: number) {
        try {
            const board = await this.boardService.getBoard(id);

            if (!board) {
                return new ResponseMessage().error(403).build();
            }
            return new ResponseMessage().success(200).body(board).build()

        } catch (err) {
            Logger.error(err);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Header('Content-Type', 'application/json')
    @Post()
    public async createBoard(@Request() req, @Body() data: ReqeustCreateBoard) {
        try {
            const { error }: { value: ReqeustCreateBoard; error?: ValidationError } = createBoardSchema.validate(data);
            if (error) {
                Logger.error(error);
                return new ResponseMessage().error(999).body('Parameter Error').build();
            }
            const board = await this.boardService.createBoard({
                ...data,
                username: req.user.username,
            });
            return new ResponseMessage().success(201).body(board).build();
        } catch (error) {
            Logger.error(error)
        }
    }


    @UseGuards(AuthGuard('jwt'))
    @Header('Content-Type', 'application/json')
    @Patch('/:id')
    public async updateBoards(@Param('id') id: number, @Request() req, @Body() body: UpdateBoard) {
        try {
            const board = await this.boardService.updateBoard(id, req.user.username, body);

            if (!board) {
                return new ResponseMessage().error(403).build();
            }
            return new ResponseMessage().success(200).build()

        } catch (err) {
            Logger.error(err);
        }
    }

    
    @UseGuards(AuthGuard('jwt'))
    @Header('Content-Type', 'application/json')
    @Delete('/:id')
    public async deleteBoards(@Param('id') id: number, @Request() req, @Body() body: UpdateBoard) {
        try {
            const board = await this.boardService.deleteBoard(id, req.user.username);

            if (!board) {
                return new ResponseMessage().error(403).build();
            }
            return new ResponseMessage().success(200).build()

        } catch (err) {
            Logger.error(err);
        }
    }
}
