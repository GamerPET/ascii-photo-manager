import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { config } from '../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  id: string;
  photo: any;

  constructor(private db: AngularFirestore,
              private router: Router,
              private aRouter: ActivatedRoute,
              private photosService: PhotosService) {
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.id = params['id'];
    });

    this.db
      .collection(config.collection_endpoint)
      .doc(this.id)
      .ref
      .get().then((doc) => {
      if (doc.exists) {
        this.photo = doc.data();
      } else {
        console.log('Document not found!');
        this.router.navigate(['gallery']);
      }
    });
  }

  onFav(e) {
    const id = e.target.dataset.id;

    if (e.target.innerText === 'favorite_border') {
      this.photosService.updateFavorite(id, true);
    } else if (e.target.innerText === 'favorite') {
      this.photosService.updateFavorite(id, false);
    } else {
      console.log('problem');
    }
  }

  onDelete(e) {
    if (confirm('Are you sure that you want do delete this photo?')) {
      this.photosService.deletePhoto(this.id);
      this.router.navigate(['gallery']);
    }
  }

}
