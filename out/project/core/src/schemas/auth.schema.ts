import { Interface } from "reliant-type";

/**
 * Example Request Validation Schema
 *
 * You can integrate libraries like `reliant-type` or `zod` here.
 */

export const LoginOrRegisterRequestSchema = Interface({
  email: "string",
  name: "string",
  password: "string?",
});


export function validateLoginPayload(payload: any): {
  valid: boolean;
  error?: string;
} {
  const validate = LoginOrRegisterRequestSchema.safeParse(payload);
  if (validate.success) {
    return { valid: true };
  } else {
    return { valid: false, error: validate.errors?.[0]?.message };
  }
}
