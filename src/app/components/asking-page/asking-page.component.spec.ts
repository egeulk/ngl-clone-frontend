import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskingPageComponent } from './asking-page.component';

describe('AskingPageComponent', () => {
  let component: AskingPageComponent;
  let fixture: ComponentFixture<AskingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
