import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresViceComponent } from './profesores-vice.component';

describe('ProfesoresViceComponent', () => {
  let component: ProfesoresViceComponent;
  let fixture: ComponentFixture<ProfesoresViceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesoresViceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresViceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
