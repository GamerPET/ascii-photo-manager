import { config } from '../app.config';
import { Photo } from '../models/photo.model';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  photos: AngularFirestoreCollection<Photo>;
  private photosDoc: AngularFirestoreDocument<Photo>;

  constructor(private db: AngularFirestore) {
    this.photos = db.collection<Photo>(config.collection_endpoint);
  }

  addPhoto(photo) {
    this.photos.add(photo);
  }

  updatePhoto(id, update) {
    this.photosDoc = this.db.doc<Photo>(`${config.collection_endpoint}/${id}`);
    this.photosDoc.update(update);
  }

  updateFavorite(id, update) {
    this.photosDoc = this.db.doc<Photo>(`${config.collection_endpoint}/${id}`);
    this.photosDoc.update({isFav: update});
  }

  deletePhoto(id) {
    this.photosDoc = this.db.doc<Photo>(`${config.collection_endpoint}/${id}`);
    this.photosDoc.delete();
  }
}
