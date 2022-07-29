import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkHoursOffComponent } from './mark-hours-off.component';

describe('MarkHoursOffComponent', () => {
  let component: MarkHoursOffComponent;
  let fixture: ComponentFixture<MarkHoursOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkHoursOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkHoursOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
