import { config } from '../app.config';
import { Comment } from '../models/comment.model';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments: AngularFirestoreCollection<Comment>;
  private commentsDoc: AngularFirestoreDocument<Comment>;

  constructor(private db: AngularFirestore) {
    this.comments = db.collection<Comment>(config.collection_comments);
  }

  addComment(comment) {
    this.comments.add(comment);
  }

  deleteComment(id) {
    this.commentsDoc = this.db.doc<Comment>(`${config.collection_comments}/${id}`);
    this.commentsDoc.delete();
  }
}
