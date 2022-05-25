import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentService: CommentsService) {

    }

    @Get()
    getComments(@Query() filterQuery): Comment[] {
        const { orderBy, searchTerm } = filterQuery;
        return this.commentService.getComments();
    }

    @Get(':id')
    getComment(@Param('id') id: string): Comment {
        return this.commentService.getComment(id);
    }

    @Post()
    createComment(@Body() message: CreateCommentDto):void {
        this.commentService.createComment(message);
    }

    @Patch(':id')
    updatedComment(@Param('id') id: string, @Body() Comment: UpdateCommentDto): Comment {
        return this.commentService.updateComment(id, Comment);
    }

    @Delete(':id')
    deleteComment(@Param('id') id: string): void {
        return this.commentService.removeComment(id);
    }
}
