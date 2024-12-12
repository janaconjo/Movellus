import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotoristaPage } from './motorista.page';

describe('MotoristaPage', () => {
  let component: MotoristaPage;
  let fixture: ComponentFixture<MotoristaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoristaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
