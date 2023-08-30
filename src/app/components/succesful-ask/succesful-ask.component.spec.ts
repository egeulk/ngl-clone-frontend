import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfulAskComponent } from './succesful-ask.component';

describe('SuccesfulAskComponent', () => {
  let component: SuccesfulAskComponent;
  let fixture: ComponentFixture<SuccesfulAskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccesfulAskComponent]
    });
    fixture = TestBed.createComponent(SuccesfulAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
