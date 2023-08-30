import { Question } from './question';

describe('Question', () => {
  it('should create an instance', () => {
    const question = new Question(1,"What is Angular?", "127.0.0.1", false);
    expect(question).toBeTruthy();
  });
});
