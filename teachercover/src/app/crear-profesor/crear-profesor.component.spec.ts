import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProfesorComponent } from './crear-profesor.component';

describe('CrearProfesorComponent', () => {
  let component: CrearProfesorComponent;
  let fixture: ComponentFixture<CrearProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
