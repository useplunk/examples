import { SendVerificationRequestParams } from "next-auth/providers";
import { plunk } from "../lib/plunk";

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  try {
    await plunk.emails.send({
      from: "hello@useplunk.com",
      name: "Plunk Authentication",
      to: params.identifier,
      subject: "YOUR EMAIL SUBJECT",
      html: "YOUR EMAIL CONTENT",
    });
  } catch (error) {
    console.log({ error });
  }
};