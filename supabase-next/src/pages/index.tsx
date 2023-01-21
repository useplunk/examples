import { FormEvent, useState } from "react";
import { supabase } from "../utils/supabase";
import { plunk } from "../utils/plunk";

export default function Index() {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp(user);

    if (error) {
      return alert(error.message);
    }

    await plunk.events.publish({
      email: user.email,
      event: "account-created",
    });

    alert("Account created!");
  };

  return (
    <>
      <h1>Welcome to my app!</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor={"email"}>Email</label>
          <input
            name={"email"}
            type={"email"}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor={"password"}>Password</label>
          <input
            name={"password"}
            type={"password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <div>
          <button type={"submit"}>Create account</button>
        </div>
      </form>
    </>
  );
}
