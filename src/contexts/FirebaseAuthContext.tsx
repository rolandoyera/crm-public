import { createContext, useEffect, useReducer } from "react"
import type { FC, ReactNode } from "react"
import PropTypes from "prop-types"
import { firebaseAuth } from "../lib/firebase"
import type { User } from "../types/user"

interface State {
    isInitialized: boolean
    isAuthenticated: boolean
    user: User | null
}

interface AuthContextValue extends State {
    platform: "Firebase"
    signInWithEmailAndPassword: (
        email: string,
        password: string
    ) => Promise<any>
    logout: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

type AuthStateChangedAction = {
    type: "AUTH_STATE_CHANGED"
    payload: {
        isAuthenticated: boolean
        user: User | null
    }
}

type Action = AuthStateChangedAction

const initialState: State = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
}

const reducer = (state: State, action: Action): State => {
    if (action.type === "AUTH_STATE_CHANGED") {
        const { isAuthenticated, user } = action.payload

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        }
    }

    return state
}

const AuthContext = createContext<AuthContextValue>({
    ...initialState,
    platform: "Firebase",
    signInWithEmailAndPassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
})

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(
        () =>
            firebaseAuth.onAuthStateChanged((user) => {
                if (user) {
                    // Here you should extract the complete user profile to make it available in your entire app.
                    // The auth state only provides basic information.
                    dispatch({
                        type: "AUTH_STATE_CHANGED",
                        payload: {
                            isAuthenticated: true,
                            user: {
                                id: user.uid,
                                avatar: "/static/roly-square.jpg",
                                email: user.email,
                                plan: "Premium",
                            },
                        },
                    })
                } else {
                    dispatch({
                        type: "AUTH_STATE_CHANGED",
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            }),
        [dispatch]
    )

    const signInWithEmailAndPassword = (
        email: string,
        password: string
    ): Promise<any> => firebaseAuth.signInWithEmailAndPassword(email, password)

    const logout = async (): Promise<void> => {
        await firebaseAuth.signOut()
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                platform: "Firebase",
                signInWithEmailAndPassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthContext
