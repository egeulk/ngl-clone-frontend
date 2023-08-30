import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerDetailsComponent } from './answer-details.component';

describe('AnswerDetailsComponent', () => {
  let component: AnswerDetailsComponent;
  let fixture: ComponentFixture<AnswerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerDetailsComponent]
    });
    fixture = TestBed.createComponent(AnswerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
