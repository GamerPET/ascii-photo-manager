import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PhotosService } from '../services/photos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  photoString = new FormControl(null, [
    Validators.required
  ]);
  description = new FormControl(null);
  date = new FormControl({value: null, disabled: true});
  location = new FormControl(null);
  tags = new FormControl(null);

  constructor(private photosService: PhotosService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.photoString.value !== null) {

      const photo = {
        photoString: this.photoString.value,
        description: this.description.value,
        date: this.date.value,
        location: this.location.value,
        tags: this.tags.value,
        isFav: false
      };

      this.photosService.addPhoto(photo);

      this.router.navigate(['gallery']);
    }
  }
}
