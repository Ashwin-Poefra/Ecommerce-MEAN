import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryHeaderComponent } from './primary-header.component';

describe('PrimaryHeaderComponent', () => {
    let component: PrimaryHeaderComponent;
    let fixture: ComponentFixture<PrimaryHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrimaryHeaderComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PrimaryHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
