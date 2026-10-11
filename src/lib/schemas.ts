import { z } from "zod";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { localDate } from "./utils";
const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(100, "Please use 100 characters or fewer.");
const phone = z
  .string()
  .trim()
  .regex(
    /^(?:\+63|0)9\d{9}$/,
    "Use a Philippine mobile number, e.g. 09171234567.",
  );
export const appointmentSchema = z.object({
  name,
  email: z.string().trim().email("Enter a valid email address."),
  phone,
  make: z.string().trim().min(2, "Enter your vehicle make.").max(60),
  model: z.string().trim().min(1, "Enter your vehicle model.").max(60),
  year: z
    .string()
    .regex(/^\d{4}$/, "Enter a four-digit year.")
    .refine(
      (v) => Number(v) >= 1960 && Number(v) <= new Date().getFullYear() + 1,
      "Enter a valid vehicle year.",
    ),
  service: z
    .string()
    .refine((v) => services.some((s) => s.id === v), "Choose a service."),
  date: z
    .string()
    .min(1, "Choose your preferred date.")
    .refine(
      (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && v >= localDate(),
      "Choose today or a future date.",
    )
    .refine(
      (v) => !v || new Date(`${v}T12:00:00`).getDay() !== 0,
      "Please choose Monday through Saturday.",
    ),
  time: z.enum(
    [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
    { error: "Choose an available time." },
  ),
  notes: z
    .string()
    .trim()
    .max(1500, "Please keep notes under 1,500 characters."),
});
export const inquirySchema = z.object({
  name,
  contact: z
    .string()
    .trim()
    .refine(
      (v) =>
        z.string().email().safeParse(v).success || phone.safeParse(v).success,
      "Enter a valid email or Philippine mobile number.",
    ),
  product: z
    .string()
    .refine(
      (v) => v === "other" || products.some((p) => p.id === v),
      "Choose a product or select Other part.",
    ),
  vehicle: z.string().trim().max(150),
  quantity: z
    .string()
    .regex(/^\d+$/, "Enter a whole number.")
    .refine(
      (v) => Number(v) >= 1 && Number(v) <= 99,
      "Choose a quantity from 1 to 99.",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Please add at least 10 characters about what you need.")
    .max(1500, "Please keep your message under 1,500 characters."),
});
export type AppointmentValues = z.infer<typeof appointmentSchema>;
export type InquiryValues = z.infer<typeof inquirySchema>;
