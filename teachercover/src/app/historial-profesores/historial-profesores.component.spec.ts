import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialProfesoresComponent } from './historial-profesores.component';

describe('HistorialProfesoresComponent', () => {
  let component: HistorialProfesoresComponent;
  let fixture: ComponentFixture<HistorialProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialProfesoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
