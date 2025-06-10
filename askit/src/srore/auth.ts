import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/client/config";

type UserPrefs = {
    reputation: number
}

interface IAuthStore {
    session: Models.Session | null
    jwt: string | null
    user: Models.User<UserPrefs> | null
    hydrated: boolean

    setHydrated(): void
    verifySession(): Promise<void>
    login(
        email: string,
        password: string
    ): Promise<{
        success: boolean,
        error?: AppwriteException | null;

    }>
    signup(
        username: string,
        email: string,
        password: string
    ): Promise<{
        success: boolean,
        error?: AppwriteException | null;

    }>

    logout(): Promise<{
        success: boolean,
        error?: AppwriteException | null;

    }>
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set) => ({
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            setHydrated() {
                set({ hydrated: true }) // hydration methods from persist
            },
            async verifySession() {
                try {
                    const session = await account.getSession("current")
                    set({ session })

                } catch (error) {
                    console.error(error)
                }
            },
            async login(email, password) {
                try {
                    const session = await account.createEmailPasswordSession(email, password)
                    const [user, { jwt }] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT()
                    ])

                    if (!user.prefs?.reputation) {
                        await account.updatePrefs<UserPrefs>({
                            reputation: 0
                        })
                    }
                    set({
                        user,
                        session,
                        jwt
                    })
                    return {
                        success: true
                    }
                } catch (error) {
                    console.error(error)
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error : null
                    }
                }

            },
            async signup(username, email, password) {
                try {
                    await account.create(ID.unique(), email, password, username)

                    return {
                        success: true
                    }

                } catch (error) {
                    console.error(error)
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error : null
                    }
                }

            },
            async logout() {
                try {
                    await account.deleteSession("current")
                    set({
                        session: null,
                        jwt: null,
                        user: null
                    })
                    return {
                        success: true
                    }


                } catch (error) {
                    console.error(error)
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error : null
                    }
                }
            }
        })),
        {
            name: "auth",
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error) state?.setHydrated()
                }
            },
        }

    )
)