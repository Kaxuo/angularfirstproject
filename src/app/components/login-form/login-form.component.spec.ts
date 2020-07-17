import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFOrmComponent } from './login-form.component';

describe('LoginFOrmComponent', () => {
  let component: LoginFOrmComponent;
  let fixture: ComponentFixture<LoginFOrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFOrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFOrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
