import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarGuardiaComponent } from './seleccionar-guardia.component';

describe('SeleccionarGuardiaComponent', () => {
  let component: SeleccionarGuardiaComponent;
  let fixture: ComponentFixture<SeleccionarGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarGuardiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
