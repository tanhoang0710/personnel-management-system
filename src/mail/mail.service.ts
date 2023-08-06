import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(REQUEST) private request: Request,
  ) {}

  async sendMailAssignForm(to: string, formId: number) {
    await this.mailerService.sendMail({
      to,
      subject: 'Complete form',
      template: `${path.join(
        __dirname,
        '../../src/mail/templates',
      )}/assign-form`,
      context: {
        text: `Complete form at http://localhost:3000/user-forms with formId: ${formId}`,
      },
    });
  }
}
