import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineRowComponent } from './timeline-row.component';

describe('TimelineRowComponent', () => {
  let component: TimelineRowComponent;
  let fixture: ComponentFixture<TimelineRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
