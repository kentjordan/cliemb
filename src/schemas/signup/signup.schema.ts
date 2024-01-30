import z from 'zod'

const signupSchema = z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    position: z.string().min(2)
});

export default signupSchema;
