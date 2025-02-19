import { z } from 'zod';

const MIN_FULLNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

export const signUpSchema = z.object({
	fullName: z.string().min(MIN_FULLNAME_LENGTH),
	email: z.string().email(),
	universityId: z.coerce.number(),
	universityCard: z.string().nonempty('University Card is required'),
	password: z.string().min(MIN_PASSWORD_LENGTH),
});

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(MIN_PASSWORD_LENGTH),
});
