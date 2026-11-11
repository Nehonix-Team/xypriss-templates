import { Router, Send } from "xypriss";
import { AuthController } from "../controller/auth.controller";

const r = Router();

r.get("/", (_req, res) => {
  const send = new Send(res);
  return send.ok("Auth Service is running", {
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

r.post("/login", AuthController.login);
r.post("/register", AuthController.register);

// Protected endpoint demonstrating XyGuard integration
r.get(
  "/me",
  {
    guards: {
      authenticated: true,
    },
  },
  AuthController.me
);

export const authRouter = r;
export default r;
