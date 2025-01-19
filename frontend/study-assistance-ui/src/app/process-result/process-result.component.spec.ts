import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessResultComponent } from './process-result.component';

describe('ProcessResultComponent', () => {
  let component: ProcessResultComponent;
  let fixture: ComponentFixture<ProcessResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
