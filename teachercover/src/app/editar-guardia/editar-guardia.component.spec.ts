import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGuardiaComponent } from './editar-guardia.component';

describe('EditarGuardiaComponent', () => {
  let component: EditarGuardiaComponent;
  let fixture: ComponentFixture<EditarGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGuardiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
