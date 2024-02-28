import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOtherComponent } from './manager-other.component';

describe('ManagerOtherComponent', () => {
  let component: ManagerOtherComponent;
  let fixture: ComponentFixture<ManagerOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerOtherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
