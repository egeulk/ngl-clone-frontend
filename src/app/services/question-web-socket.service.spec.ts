import { TestBed } from '@angular/core/testing';

import { QuestionWebSocketService } from './question-web-socket.service';

describe('QuestionWebSocketService', () => {
  let service: QuestionWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
