import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribtionDetailComponent } from './subscribtion-detail.component';

describe('SubscribtionDetailComponent', () => {
  let component: SubscribtionDetailComponent;
  let fixture: ComponentFixture<SubscribtionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribtionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscribtionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
