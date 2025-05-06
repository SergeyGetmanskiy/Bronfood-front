import { createContext, FC, PropsWithChildren, useState } from 'react';
import { authService, LoginData, RegisterPayload, RegisterPromise, UpdateUserPayload, User, UserExtra } from '../utils/api/authService';
import { useMutation, UseMutationResult, useQuery, UseQueryResult, useQueryClient } from '@tanstack/react-query';

type CurrentUserContext = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: UseMutationResult<void, Error, LoginData, unknown> | Record<string, never>;
    signUp: UseMutationResult<{ data: RegisterPromise }, Error, RegisterPayload, unknown> | Record<string, never>;
    logout: UseMutationResult<void, Error, void, unknown> | Record<string, never>;
    updateUser: UseMutationResult<void, Error, UpdateUserPayload, unknown> | Record<string, never>;
    confirmSignUp: UseMutationResult<void, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    confirmUpdateUser: UseMutationResult<{ data: UserExtra }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    profile: UseQueryResult<{ data: User }, Error> | Record<string, never>;
};

export const CurrentUserContext = createContext<CurrentUserContext>({
    currentUser: null,
    isLogin: false,
    signIn: {},
    signUp: {},
    logout: {},
    updateUser: {},
    confirmSignUp: {},
    confirmUpdateUser: {},
    profile: {},
});

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const token = localStorage.getItem('token');
    const [phone, setPhone] = useState<string>('');
    const client = useQueryClient();

    useQuery({
        queryKey: ['refresh token'],
        queryFn: () => authService.refreshToken(),
        refetchInterval: 4.9 * 60 * 1000,
        refetchIntervalInBackground: true,
        retry: false,
    });

    const profile = useQuery({
        queryKey: ['profile'],
        queryFn: () => authService.getProfile(),
        retry: false,
        enabled: !!token,
    });

    const isLogin = !!profile.data;

    const signIn = useMutation({
        mutationFn: (variables: LoginData) => authService.login(variables),
        onSuccess: () => profile.refetch(),
    });
    const signUp = useMutation({
        mutationFn: (variables: RegisterPayload) => authService.register(variables),
        onSuccess: (res) => setPhone(res.data.phone),
    });
    const confirmSignUp = useMutation({
        mutationFn: (variables: { confirmation_code: string }) => authService.confirmRegister({ phone, code: variables.confirmation_code }),
        onSuccess: () => profile.refetch(),
    });
    const updateUser = useMutation({
        mutationFn: (variables: UpdateUserPayload) => authService.updateUser(variables),
    });
    const confirmUpdateUser = useMutation({
        mutationFn: (variables: { confirmation_code: string }) => authService.confirmUpdateUser({ confirmation_code: variables.confirmation_code }),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['profile'] });
        },
    });
    const logout = useMutation({
        mutationFn: () => authService.logOut(),
        onSuccess: () => {
            client.removeQueries({ queryKey: ['profile'] });
            profile.refetch();
        },
    });

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser: profile.data?.data || null,
                isLogin,
                signIn,
                signUp,
                logout,
                updateUser,
                confirmSignUp,
                confirmUpdateUser,
                profile,
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};
