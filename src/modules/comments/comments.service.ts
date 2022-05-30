import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentsService {


    constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {

    }

    async getComments(): Promise<Comment[]> {
        return await this.commentRepository.find();
    }

    async getComment(id: number): Promise<Comment> {
        const comment = await this.commentRepository.findOne({where: {
            id: id,
        }});
        if (!comment) {
            throw new NotFoundException("Resource no found");
        }

        return comment;
    }

    async updateComment(id: number, { message }: UpdateCommentDto): Promise<Comment> {
        const comment: Comment = await this.commentRepository.preload({
            id,
            message
        });

        if (!comment) {
            throw new NotFoundException("Resource no found");
        }

        return comment;
    }

    async createComment({ message }: CreateCommentDto): Promise<Comment> {
        const comment: Comment = this.commentRepository.create({ message });
        return this.commentRepository.save(comment);
    }

    async removeComment(id: number): Promise<void> {
        const comment: Comment = await this.commentRepository.findOne({where: {
            id: id,
        }});

        if (!comment) {
            throw new NotFoundException("Resource no found");
        }

        this.commentRepository.remove(comment);
    }
}
