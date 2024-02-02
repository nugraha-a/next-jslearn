import styles from "@/views/Auth/Login/Login.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginView() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { push, query } = useRouter();
    const callbackUrl: any = query.callBackUrl || '/';
    const handleSubmit = async (event: any) => {
        setError("");
        setIsLoading(true);
        event.preventDefault();
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });

            if (!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {

            }
        } catch (error) {
            
        }
    };
    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login</h1>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.login__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.login__form__item}>
                        <label
                            htmlFor="email"
                            className={styles.login__form__item__label}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            className={styles.login__form__item__input}
                        />
                    </div>

                    <div className={styles.login__form__item}>
                        <label
                            htmlFor="password"
                            className={styles.login__form__item__label}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className={styles.login__form__item__input}
                        />
                    </div>

                    <button
                        className={styles.login__form__item__button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
            <p className={styles.login__link}>
                Tidak punya akun ? <Link href="/auth/register">Register In Here</Link>
            </p>
        </div>
    );
}
