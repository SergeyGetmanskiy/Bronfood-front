import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { authService, LoginData, RegisterPayload, RegisterPromise, UpdateUser, User, UserExtended, UserExtra } from '../utils/api/authService';
import { useMutation, UseMutationResult, useQuery, UseQueryResult, useQueryClient } from '@tanstack/react-query';

type CurrentUserContext = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: UseMutationResult<{ data: User }, Error, LoginData, unknown> | Record<string, never>;
    signUp: UseMutationResult<{ data: RegisterPromise }, Error, RegisterPayload, unknown> | Record<string, never>;
    logout: UseMutationResult<void, Error, void, unknown> | Record<string, never>;
    updateUser: UseMutationResult<{ data: { temp_data_code: string } }, Error, UpdateUser, unknown> | Record<string, never>;
    confirmSignUp: UseMutationResult<void, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    confirmUpdateUser: UseMutationResult<{ data: UserExtra }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    profile: UseQueryResult<UserExtended, Error> | Record<string, never>;
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
    const [phone, setPhone] = useState<string>('');
    const client = useQueryClient();

    const profile = useQuery({
        queryKey: ['profile'],
        queryFn: () => authService.getProfile(),

        //retry: false,
        staleTime: 5 * 60 * 1000 * 0,
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
        mutationFn: (variables: UpdateUser) => authService.updateUser(variables),
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

    useEffect(() => {
        if (profile.error?.message === 'Authentication credentials were not provided.') {
            authService.refreshToken();
        }
    }, [profile.error]);

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser:
                    {
                        userId: profile.data?.user_id,
                        phone: profile.data?.phone,
                        fullname: profile.data?.name,
                        role: profile.data?.role,
                    } || null,
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
