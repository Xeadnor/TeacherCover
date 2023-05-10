import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGuardiaComponent } from './crear-guardia.component';

describe('CrearGuardiaComponent', () => {
  let component: CrearGuardiaComponent;
  let fixture: ComponentFixture<CrearGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearGuardiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
