import { Injectable } from '@nestjs/common';
import { Board } from 'src/entities/board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoard, UpdateBoard } from './board.type';

@Injectable()
export class BoardService {
    
    constructor(private readonly boardRepository: BoardRepository) { }

    public async createBoard(boardData: CreateBoard): Promise<Board> {
        const createBoard = await this.boardRepository.create();

        createBoard.title = boardData.title;
        createBoard.content = boardData.content;
        createBoard.username = boardData.username;

        const board = await this.boardRepository.save(createBoard);
        return board;
    }

    public async getBoards() {
        const boards = await this.boardRepository.find({
            select: ['id', 'title', 'content', 'createdDate', 'updatedDate', 'username']
        });
        return boards;
    }

    public async getBoard(id: number) {
        const board = await this.boardRepository.findOne({
            select: ['id', 'title', 'content', 'createdDate', 'updatedDate', 'username'],
            where: {
                id: id,
            }
        });
        return board;
    }

    public async updateBoard(id: number, username: string, body: UpdateBoard) {
        const board = await this.boardRepository.findOne({
            where: {
                id: id,
                username: username
            }
        });
        if (!board) {
            return null;
        }

        board.title = body.title || board.title;
        board.content = body.content || board.content;
        board.updatedDate = new Date();
        const updatedBoard = await this.boardRepository.save(board);

        return updatedBoard;
    }

    }
}
