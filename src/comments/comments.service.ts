import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';

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
        return this.comments.find((item) => item.id == id);
    }

    updateComment(id: string, message: any) {
        const comment: Comment = this.getComment(id);
        comment.message = message;

        return comment;
    }

    createComment(message: string) {
        this.comments.push({ 
            id: (Math.floor(Math.random() * 2000) + 1).toString(),
            message
        });
    }

    removeComment(id:string){
        const index = this.comments.findIndex((comment) => comment.id === id);

        if(index >= 0){
            this.comments.splice(index,1);
        }
    }
}
