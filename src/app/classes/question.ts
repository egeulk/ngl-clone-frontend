export class Question {
    id: number;
    questionText: string;
    ipAddress: string | undefined;
    isRead: boolean
  
    constructor(id : number, questionText: string, ipAddress: string | undefined, isRead: boolean) {
      this.id = id;
      this.questionText = questionText;
      this.ipAddress = ipAddress;
      this.isRead = isRead;
    }
  }