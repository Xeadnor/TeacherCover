import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioSemanalComponent } from './calendario-semanal.component';

describe('CalendarioSemanalComponent', () => {
  let component: CalendarioSemanalComponent;
  let fixture: ComponentFixture<CalendarioSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioSemanalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
