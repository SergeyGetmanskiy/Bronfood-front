import { createContext, FC, PropsWithChildren } from 'react';
import { authService, LoginData, RegisterData, UpdateUser, User, UserExtra } from '../utils/api/authService';
import { useMutation, UseMutationResult, useQuery, UseQueryResult, useQueryClient } from '@tanstack/react-query';

type CurrentUserContext = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: UseMutationResult<{ data: User }, Error, LoginData, unknown> | Record<string, never>;
    signUp: UseMutationResult<{ data: { temp_data_code: string } }, Error, RegisterData, unknown> | Record<string, never>;
    logout: UseMutationResult<void, Error, void, unknown> | Record<string, never>;
    updateUser: UseMutationResult<{ data: { temp_data_code: string } }, Error, UpdateUser, unknown> | Record<string, never>;
    confirmSignUp: UseMutationResult<{ data: User }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    confirmUpdateUser: UseMutationResult<{ data: UserExtra }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    profile: UseQueryResult<User, Error> | Record<string, never>;
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
    const client = useQueryClient();

    const profile = useQuery({
        queryKey: ['profile'],
        queryFn: authService.checkAuthorization,
        initialData: {},
        enabled: false,
    });
    console.log(profile.data);

    const isLogin = false;

    const signIn = useMutation({
        mutationFn: (variables: LoginData) => authService.login(variables),
        onSuccess: () => {
            profile.refetch();
        },
    });
    const signUp = useMutation({
        mutationFn: (variables: RegisterData) => authService.register(variables),
        onSuccess: (res) => {
            console.log(res);
            client.setQueryData('profile', () => res);
            console.log(profile.data);
        },
    });
    const confirmSignUp = useMutation({
        mutationFn: (variables: { confirmation_code: string }) => authService.confirmRegisterPhone({ phone: user.phone, code: variables.confirmation_code }),
        onSuccess: (res) => {
            console.log(res);
            client.setQueryData('profile', res);
        },
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

    return (
        <CurrentUserContext.Provider
            value={{
                /* currentUser: {
                    userId: user.user_id,
                    phone: user.phone,
                    fullname: user.name,
                    role: user.role,
                } || null, */
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
