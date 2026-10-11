"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  Package,
} from "lucide-react";
import {
  appointmentSchema,
  inquirySchema,
  type AppointmentValues,
  type InquiryValues,
} from "@/lib/schemas";
import { localDate } from "@/lib/utils";
import { services } from "@/data/services";
import { products } from "@/data/products";
function Field({
  id,
  label,
  error,
  children,
  wide = false,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`form-field ${wide ? "wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
const simulate = () => new Promise<void>((resolve) => setTimeout(resolve, 850));
function Success({ type, onReset }: { type: string; onReset: () => void }) {
  return (
    <div
      className="form-success"
      role="status"
      tabIndex={-1}
      ref={(node) => node?.focus()}
    >
      <CheckCircle2 size={42} />
      <h3>{type} demo complete.</h3>
      <p>
        Your details passed validation. This was a local simulation only.
        Nothing was sent, saved, booked, or reserved.
      </p>
      <button className="button secondary" onClick={onReset}>
        Try another demonstration
      </button>
    </div>
  );
}
function AppointmentForm({ preselected }: { preselected: string }) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      make: "",
      model: "",
      year: "",
      service: preselected,
      date: "",
      notes: "",
    },
  });
  const a = (key: keyof AppointmentValues) => ({
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `booking-${key}-error` : undefined,
  });
  if (done)
    return (
      <Success
        type="Appointment"
        onReset={() => {
          reset();
          setDone(false);
        }}
      />
    );
  return (
    <form
      noValidate
      onSubmit={handleSubmit(async () => {
        await simulate();
        setDone(true);
      })}
      className="booking-form"
    >
      <div className="form-grid">
        <Field id="booking-name" label="Full name" error={errors.name?.message}>
          <input
            id="booking-name"
            autoComplete="name"
            {...register("name")}
            {...a("name")}
            placeholder="Juan dela Cruz"
          />
        </Field>
        <Field
          id="booking-email"
          label="Email address"
          error={errors.email?.message}
        >
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            {...a("email")}
            placeholder="you@example.com"
          />
        </Field>
        <Field
          id="booking-phone"
          label="Phone number"
          error={errors.phone?.message}
          wide
        >
          <input
            id="booking-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            {...a("phone")}
            placeholder="09171234567"
          />
        </Field>
        <Field
          id="booking-make"
          label="Vehicle make"
          error={errors.make?.message}
        >
          <input
            id="booking-make"
            {...register("make")}
            {...a("make")}
            placeholder="e.g. Toyota"
          />
        </Field>
        <Field
          id="booking-model"
          label="Vehicle model"
          error={errors.model?.message}
        >
          <input
            id="booking-model"
            {...register("model")}
            {...a("model")}
            placeholder="e.g. Vios"
          />
        </Field>
        <Field
          id="booking-year"
          label="Vehicle year"
          error={errors.year?.message}
        >
          <input
            id="booking-year"
            inputMode="numeric"
            maxLength={4}
            {...register("year")}
            {...a("year")}
            placeholder="e.g. 2022"
          />
        </Field>
        <Field
          id="booking-service"
          label="Service requested"
          error={errors.service?.message}
        >
          <select
            id="booking-service"
            {...register("service")}
            {...a("service")}
          >
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="booking-date"
          label="Preferred date"
          error={errors.date?.message}
        >
          <input
            id="booking-date"
            type="date"
            min={localDate()}
            {...register("date")}
            {...a("date")}
          />
        </Field>
        <Field
          id="booking-time"
          label="Preferred time (Philippine time)"
          error={errors.time?.message}
        >
          <select id="booking-time" {...register("time")} {...a("time")}>
            <option value="">Choose a time</option>
            {[
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
            ].map((t) => (
              <option key={t} value={t}>
                {Number(t.slice(0, 2)) > 12
                  ? `${Number(t.slice(0, 2)) - 12}:00 PM`
                  : `${t} AM`}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="booking-notes"
          label="Additional notes (optional)"
          error={errors.notes?.message}
          wide
        >
          <textarea
            id="booking-notes"
            rows={4}
            {...register("notes")}
            {...a("notes")}
            placeholder="Tell us about any symptoms or concerns…"
          />
        </Field>
      </div>
      <p className="fine-print">
        All fields are required except additional notes. Monday–Saturday only.
        Please use sample information.
      </p>
      <button className="button full" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <>
            <LoaderCircle className="spin" size={18} />
            Simulating request…
          </>
        ) : (
          <>
            Preview Appointment Request <ArrowUpRight size={18} />
          </>
        )}
      </button>
      <p className="fine-print form-disclaimer">
        Demo only. No appointment is booked and no information is transmitted.
      </p>
    </form>
  );
}
function InquiryForm({ preselected }: { preselected: string }) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      contact: "",
      product: preselected,
      vehicle: "",
      quantity: "1",
      message: "",
    },
  });
  const a = (key: keyof InquiryValues) => ({
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `inquiry-${key}-error` : undefined,
  });
  if (done)
    return (
      <Success
        type="Parts inquiry"
        onReset={() => {
          reset();
          setDone(false);
        }}
      />
    );
  return (
    <form
      noValidate
      onSubmit={handleSubmit(async () => {
        await simulate();
        setDone(true);
      })}
    >
      <div className="form-grid">
        <Field id="inquiry-name" label="Full name" error={errors.name?.message}>
          <input
            id="inquiry-name"
            autoComplete="name"
            {...register("name")}
            {...a("name")}
            placeholder="Juan dela Cruz"
          />
        </Field>
        <Field
          id="inquiry-contact"
          label="Email or phone"
          error={errors.contact?.message}
        >
          <input
            id="inquiry-contact"
            {...register("contact")}
            {...a("contact")}
            placeholder="Email or Philippine mobile"
          />
        </Field>
        <Field
          id="inquiry-product"
          label="Selected product"
          error={errors.product?.message}
          wide
        >
          <select
            id="inquiry-product"
            {...register("product")}
            {...a("product")}
          >
            <option value="">Choose a part</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.id}
              </option>
            ))}
            <option value="other">Other part / help finding a part</option>
          </select>
        </Field>
        <Field
          id="inquiry-vehicle"
          label="Vehicle details (optional)"
          error={errors.vehicle?.message}
        >
          <input
            id="inquiry-vehicle"
            {...register("vehicle")}
            {...a("vehicle")}
            placeholder="e.g. 2022 Toyota Vios"
          />
        </Field>
        <Field
          id="inquiry-quantity"
          label="Quantity"
          error={errors.quantity?.message}
        >
          <input
            id="inquiry-quantity"
            type="number"
            min="1"
            max="99"
            {...register("quantity")}
            {...a("quantity")}
          />
        </Field>
        <Field
          id="inquiry-message"
          label="Inquiry message"
          error={errors.message?.message}
          wide
        >
          <textarea
            id="inquiry-message"
            rows={5}
            {...register("message")}
            {...a("message")}
            placeholder="What would you like to know about this part?"
          />
        </Field>
      </div>
      <p className="fine-print">
        All fields are required except vehicle details. Please use sample
        information.
      </p>
      <button className="button full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle className="spin" size={18} />
            Simulating inquiry…
          </>
        ) : (
          <>
            Preview Parts Inquiry <ArrowUpRight size={18} />
          </>
        )}
      </button>
      <p className="fine-print form-disclaimer">
        Demo only. No inquiry is sent and no part is reserved.
      </p>
    </form>
  );
}
export function ContactForms() {
  const params = useSearchParams();
  const product = params.get("product") || "";
  const service = params.get("service") || "";
  const initial =
    product || params.get("tab") === "parts" ? "parts" : "booking";
  const [chosen, setChosen] = useState<string | null>(null);
  const tab = chosen || initial;
  const invalid =
    (!!product && !products.some((p) => p.id === product)) ||
    (!!service && !services.some((s) => s.id === service));
  return (
    <div className="form-panel">
      <div className="form-tabs" aria-label="Choose request type">
        {[
          ["booking", "Appointment", CalendarDays],
          ["parts", "Parts inquiry", Package],
        ].map(([id, label, Icon]) => {
          const I = Icon as typeof Package;
          return (
            <button
              key={id as string}
              aria-pressed={tab === id}
              onClick={() => setChosen(id as string)}
              className={tab === id ? "active" : ""}
            >
              <I size={18} />
              {label as string}
            </button>
          );
        })}
      </div>
      <h2>
        {tab === "booking"
          ? "Let’s look after your car."
          : "Let’s find your next part."}
      </h2>
      <p className="form-subtitle">
        {tab === "booking"
          ? "Share a few details to preview an appointment request."
          : "Tell us what you’re looking for and check the fit."}
      </p>
      <div className="notice compact">
        Frontend demonstration only. Submissions are simulated locally and never
        delivered.
      </div>
      {invalid && (
        <p className="field-error" role="status">
          That service or product wasn’t recognized. Please choose one below.
        </p>
      )}
      {tab === "booking" ? (
        <AppointmentForm
          key={`booking-${service}`}
          preselected={services.some((s) => s.id === service) ? service : ""}
        />
      ) : (
        <InquiryForm
          key={`parts-${product}`}
          preselected={products.some((p) => p.id === product) ? product : ""}
        />
      )}
    </div>
  );
}
