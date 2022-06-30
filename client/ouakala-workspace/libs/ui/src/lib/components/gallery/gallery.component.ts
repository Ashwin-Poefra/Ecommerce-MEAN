import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent implements OnInit {
    @Input()
    public images: string[] = [];
    public selectedImageUrl = '';

    constructor() {}

    ngOnInit(): void {
        this.getFirstImage();
    }

    public getFirstImage() {
        if (this.hasImages) {
            this.selectedImageUrl = this.images[0];
        }
    }

    public onChangeSelectImage(image: string) {
        this.selectedImageUrl = image;
    }

    get hasImages(): boolean {
        return this.images?.length > 0;
    }
}
