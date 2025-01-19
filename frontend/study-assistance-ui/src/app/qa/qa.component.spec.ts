import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAComponent } from './qa.component';

describe('QAComponent', () => {
  let component: QAComponent;
  let fixture: ComponentFixture<QAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
