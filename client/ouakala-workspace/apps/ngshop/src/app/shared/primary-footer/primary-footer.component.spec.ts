import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryFooterComponent } from './primary-footer.component';

describe('PrimaryFooterComponent', () => {
    let component: PrimaryFooterComponent;
    let fixture: ComponentFixture<PrimaryFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrimaryFooterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PrimaryFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
