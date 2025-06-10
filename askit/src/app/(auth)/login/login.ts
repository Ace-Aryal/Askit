// "use server"

// import { emailRegex, passwordRegex } from ".."
// import { authType } from ".."


// export async function login(prevState: unknown, formData: FormData) {

//     const email = formData.get("email") as string
//     const password = formData.get("password") as string
//     let errorObj: authType = {
//         email,
//         password,
//         errors: {}
//     }

//     if (!emailRegex.test(email.trim())) {
//         errorObj = {
//             email,
//             password,
//             errors: {
//                 ...errorObj.errors,
//                 email: "Invalid email format"
//             }

//         }
//     }
//     if (!passwordRegex.test(password)) {
//         errorObj = {
//             email,
//             password,
//             errors: {
//                 ...errorObj.errors,
//                 password: "I password must contain a Uppercase, a lowercase and a numer and be at least 6 chars long"
//             }
//         }
//     }


//     try {
//         console.log(email, password)


//     } catch (error) {
//         console.error(error)
//         errorObj = {
//             email,
//             password,
//             errors: {
//                 ...errorObj.errors,
//                 server: "Invalid password format, password must contain a Uppercase, a lowercase and a numer and be at least 6 chars long"
//             }
//         }
//     }
//     if (Object.keys(errorObj.errors).length > 0) {
//         return errorObj
//     }
// }