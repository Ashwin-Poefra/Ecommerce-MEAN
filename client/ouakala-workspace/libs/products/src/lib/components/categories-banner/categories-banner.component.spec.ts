import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesBannerComponent } from './categories-banner.component';

describe('CategoriesBannerComponent', () => {
  let component: CategoriesBannerComponent;
  let fixture: ComponentFixture<CategoriesBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
