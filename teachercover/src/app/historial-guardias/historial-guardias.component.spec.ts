import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialGuardiasComponent } from './historial-guardias.component';

describe('HistorialGuardiasComponent', () => {
  let component: HistorialGuardiasComponent;
  let fixture: ComponentFixture<HistorialGuardiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialGuardiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialGuardiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
