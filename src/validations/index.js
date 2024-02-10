const { z } = require("zod");

exports.signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be atleast 3 characters long" })
    .max(255),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, {
      message: "Password should be atleast 6 characters long",
    })
    .max(255),
  date_of_birth: z.string().refine((value) => /\d{4}-\d{2}-\d{2}/.test(value), {
    message: "Invalid date format. Should be in YYYY-MM-DD format",
  }),
  contact: z.string(),
  address: z.string(),
});

exports.loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, {
      message: "Password should be atleast 6 characters long",
    })
    .max(255),
});

exports.profileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be atleast 3 characters long" })
    .max(255),
  date_of_birth: z.string().refine((value) => /\d{4}-\d{2}-\d{2}/.test(value), {
    message: "Invalid date format. Should be in YYYY-MM-DD format",
  }),
  contact: z.string(),
  address: z.string(),
}).strict();
