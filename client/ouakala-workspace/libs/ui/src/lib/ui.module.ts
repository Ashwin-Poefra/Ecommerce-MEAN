import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
    declarations: [BannerComponent, SliderComponent, GalleryComponent],
    imports: [CommonModule, ButtonModule],
    exports: [BannerComponent, SliderComponent, ButtonModule, GalleryComponent]
})
export class UiModule {}
