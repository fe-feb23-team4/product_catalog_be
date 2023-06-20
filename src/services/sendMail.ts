import 'dotenv/config';
import { send } from './emailService';

send({
  email: 'test@gmail.com',
  subject: 'Proposition',
  html: `Registration link`,
});
