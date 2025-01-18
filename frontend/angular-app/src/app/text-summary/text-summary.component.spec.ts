import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSummaryComponent } from './text-summary.component';

describe('TextSummaryComponent', () => {
  let component: TextSummaryComponent;
  let fixture: ComponentFixture<TextSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
