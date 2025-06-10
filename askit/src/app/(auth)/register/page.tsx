"use client"
import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"

// import { useActionState } from "react"
// // import { signup } from "./signup"
// import { authType } from ".."
import { useAuthStore } from "@/srore/auth"
import Spinner from "@/components/atoms/Spinner"
import { useRouter } from "next/navigation"
import { showErrorToast, showSuccessToast } from "@/components/atoms/toast"

type FormValues = {
    username: string,
    password: string,
    email: string
}
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
    const { signup } = useAuthStore()
    const router = useRouter()
    // const [state, formAction, isPending] = useActionState(signup, initialState)
    const handleSignUp = async (data: {
        username: string,
        email: string,
        password: string
    }) => {
        console.log(data)
        const { username, email, password } = data
        try {
            const response = await signup(username, email, password)
            if (response.error) {
                return showErrorToast("Failed to log in ! Retry")
            }
            router.push("/login")
            showSuccessToast("Sign up sucessful, login to continue")
        } catch (error) {
            console.error(error)
            showErrorToast("Failed to sign up ! Retry")
        }
    }
    const { register, handleSubmit, formState: {
        isSubmitting, errors
    } } = useForm<FormValues>()

    return (
        <div className="max-w-md mx-auto p-8 bg-zinc-900 rounded-lg shadow-md border border-zinc-700">
            <h2 className="text-2xl font-semibold mb-6 text-center text-zinc-100">
                Create a new account
            </h2>

            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium mb-1 text-zinc-300"
                    >
                        Username
                    </label>
                    <input
                        {...register("username",
                            {
                                required: "Username is required",
                                validate: {
                                    minlength: value => value.length > 3 || "Username must be at least 4 chars long"
                                }
                            }
                        )}
                        type="text"
                        id="username"
                        name="username"
                        required
                        className="w-full rounded-md border border-zinc-700 px-3 py-2 text-sm placeholder:text-zinc-500
             focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-100 bg-zinc-800"
                        placeholder="dipesharyal"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

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
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Password must have ≥8 characters, including uppercase, lowercase, and a number."

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
                    {isSubmitting ? <Spinner /> : "Sign up"}

                </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-zinc-100 hover:text-zinc-300"
                >
                    Sign in
                </Link>
            </p>
        </div>
    )
}
