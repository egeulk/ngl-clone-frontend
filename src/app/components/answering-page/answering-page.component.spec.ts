import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweringPageComponent } from './answering-page.component';

describe('AnsweringPageComponent', () => {
  let component: AnsweringPageComponent;
  let fixture: ComponentFixture<AnsweringPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsweringPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
