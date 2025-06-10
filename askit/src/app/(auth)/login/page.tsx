"use client"
import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FormValues } from ".."
import { useAuthStore } from "@/srore/auth"
import Spinner from "@/components/atoms/Spinner"
import { showErrorToast, showSuccessToast } from "@/components/atoms/toast"

// import { useActionState } from "react"
// // import { signup } from "./signup"
// import { authType } from ".."

export default function SignupForm() {
    // const initialState: authType = {
    //     username: "",
    //     email: "",
    //     password: "",
    //     errors: {},
    // }
    // data: {
    //     data: {
    //         email: string,
    //         username: string,
    //         password: string
    //     }
    // }

    // const [state, formAction, isPending] = useActionState(signup, initialState)
    const { login } = useAuthStore()
    const handleLogin = async (data: {
        email: string,
        password: string
    }
    ) => {
        console.log(data)
        const { email, password } = data
        try {
            const response = await login(email, password)
            if (response.error) {
                return showErrorToast("Failed to log in ! Retry")
            }
            showSuccessToast("Logged in sucessfully")
        } catch (error) {
            console.error(error)
            showErrorToast("Failed to log in ! Retry")
        }
    }
    const { register, handleSubmit, formState: {
        isSubmitting, errors
    } } = useForm<FormValues>()

    return (
        <div className="max-w-md mx-auto p-8 bg-zinc-900 rounded-lg shadow-md border border-zinc-700">
            <h2 className="text-2xl font-semibold mb-6 text-center text-zinc-100">
                Login to your account
            </h2>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1 text-zinc-300"
                    >
                        Email address
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Invalid email address"
                            }
                        })}
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-md border border-zinc-700 px-3 py-2 text-sm placeholder:text-zinc-500
             focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-100 bg-zinc-800"
                        placeholder="you@example.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-1 text-zinc-300"
                    >
                        Password
                    </label>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                                message: "Password must have ≥6 characters, including uppercase, lowercase, and a number."

                            }
                        })}
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="w-full rounded-md border border-zinc-700 px-3 py-2 text-sm placeholder:text-zinc-500
             focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-100 bg-zinc-800"
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>



                <button
                    type="submit"
                    className="w-full rounded-md bg-zinc-800 py-2 text-zinc-100 text-sm font-semibold
           hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                >
                    {isSubmitting ? <Spinner /> : "Sign in"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
                Don{`'`}t have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-zinc-100 hover:text-zinc-300"
                >
                    Sign up
                </Link>
            </p>
        </div>
    )
}
