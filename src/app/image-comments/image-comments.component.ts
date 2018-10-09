import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../services/comments.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { config } from '../app.config';
import { Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-image-comments',
  templateUrl: './image-comments.component.html',
  styleUrls: ['./image-comments.component.css']
})
export class ImageCommentsComponent implements OnInit {

  photoId: string;
  comments: Observable<any[]>;

  fcComment = new FormControl(null, [
    Validators.required
  ]);

  constructor(private commentsService: CommentsService,
              private db: AngularFirestore,
              private aRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.photoId = params['id'];
    });

    this.comments = this.db
      .collection(config.collection_comments,
          ref => ref.where('photoId', '==', this.photoId))
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;

          return {id, ...data};
        });
      }));
  }

  onSubmit() {
    const newComment = this.fcComment.value;

    if (newComment) {
      const comm = {
        comment: newComment,
        photoId: this.photoId,
        date: new Date()
      };

      this.commentsService.addComment(comm);
    }
  }

  deleteComment(e) {
    if (confirm('Are you sure that you want do delete this comment?')) {
      const id = e.target.parentElement.dataset.id;
      this.commentsService.deleteComment(id);
    }
  }
}
