import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentsService {
    private comments: Comment[] = [
        {
            id: "1",
            message: "First message",
        }
    ];

    getComments(): Comment[] {
        return this.comments;
    }

    getComment(id: string): Comment {
        const comment = this.comments.find((item) => item.id == id);
        if (!comment) {
            throw new NotFoundException("Resource no found");
        }

        return comment;
    }

    updateComment(id: string, { message }: UpdateCommentDto) {
        const comment: Comment = this.getComment(id);
        comment.message = message;

        return comment;
    }

    createComment({ message }: CreateCommentDto) {
        this.comments.push({
            id: (Math.floor(Math.random() * 2000) + 1).toString(),
            message
        });
    }

    removeComment(id: string) {
        const index = this.comments.findIndex((comment) => comment.id === id);

        if (index >= 0) {
            this.comments.splice(index, 1);
        }
    }
}
