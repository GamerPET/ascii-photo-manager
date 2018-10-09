import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PhotosService } from '../services/photos.service';
import { Photo } from '../models/photo.model';
import { config } from '../app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  photos: Observable<any[]>;

  constructor(private db: AngularFirestore, private photosService: PhotosService) { }

  ngOnInit() {
    this.photos = this.db
      .collection(config.collection_endpoint)
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Photo;
          const id = a.payload.doc.id;

          return {id, ...data};
        });
      }));
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

}
