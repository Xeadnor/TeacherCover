import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponuntuComponent } from './componuntu.component';

describe('ComponuntuComponent', () => {
  let component: ComponuntuComponent;
  let fixture: ComponentFixture<ComponuntuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponuntuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponuntuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
