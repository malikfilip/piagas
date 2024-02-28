import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReqComponent } from './manager-req.component';

describe('ManagerReqComponent', () => {
  let component: ManagerReqComponent;
  let fixture: ComponentFixture<ManagerReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
