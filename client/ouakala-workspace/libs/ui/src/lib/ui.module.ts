import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [BannerComponent, SliderComponent],
    imports: [CommonModule, ButtonModule],
    exports: [BannerComponent, SliderComponent, ButtonModule]
})
export class UiModule {}
