import styles from "@/views/Auth/Register/Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterView() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { push } = useRouter();
    const handleSubmit = async (event: any) => {
        setError("");
        setIsLoading(true);
        event.preventDefault();
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value,
        };
        const result = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (result.status === 200) {
            event.target.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            setError(result.status === 400 ? "Email already exsist" : "");
        }
    };
    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label
                            htmlFor="email"
                            className={styles.register__form__item__label}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            className={styles.register__form__item__input}
                        />
                    </div>

                    <div className={styles.register__form__item}>
                        <label
                            htmlFor="fullname"
                            className={styles.register__form__item__label}
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="Full Name"
                            className={styles.register__form__item__input}
                        />
                    </div>

                    <div className={styles.register__form__item}>
                        <label
                            htmlFor="password"
                            className={styles.register__form__item__label}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className={styles.register__form__item__input}
                        />
                    </div>

                    <button
                        className={styles.register__form__item__button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
            </div>
            <p className={styles.register__link}>
                Sudah punya akun ? <Link href="/auth/login">Sign In Here</Link>
            </p>
        </div>
    );
}
