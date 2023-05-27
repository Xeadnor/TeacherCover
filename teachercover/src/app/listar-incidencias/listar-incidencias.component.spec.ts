import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIncidenciasComponent } from './listar-incidencias.component';

describe('ListarIncidenciasComponent', () => {
  let component: ListarIncidenciasComponent;
  let fixture: ComponentFixture<ListarIncidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarIncidenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
