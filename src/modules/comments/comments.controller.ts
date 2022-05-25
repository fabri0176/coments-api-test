import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentService: CommentsService) {

    }

    @Get()
    getTuits(@Query() filterQuery): Comment[] {
        const { orderBy, searchTerm } = filterQuery;
        return this.commentService.getComments();
    }

    @Get(':id')
    getComment(@Param('id') id: string): Comment {
        return this.commentService.getComment(id);
    }

    @Post()
    createComment(@Body('message') message: string):void {
        this.commentService.createComment(message);
    }

    @Patch(':id')
    updatedComment(@Param('id') id: string, @Body('message') Comment): Comment {
        return this.commentService.updateComment(id, Comment);
    }

    @Delete(':id')
    deleteComment(@Param('id') id: string) {
        return this.commentService.removeComment(id);
    }
}
