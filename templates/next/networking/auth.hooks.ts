import {useMutation} from "@tanstack/react-query";
import {ApiError} from "../models/ApiError";
import {useApiStore} from "../stores/ApiStore";
import {useAppStore} from "../stores/AppStore";
import {AuthUser} from "../models/AuthUser";

export function useAuth(onError: (error: ApiError) => any) {
  const apiStore = useApiStore();
  const appStore = useAppStore();

  return useMutation<any, ApiError, any>({
    mutationFn: (auth: {username: string; password: string}) =>
      apiStore
        .post<{user: AuthUser & {token: string}}>({
          path: "/user/login",
          body: {
            ...auth,
          },
        })
        .then(res => {
          const {token, ...rest} = res.data.user;
          appStore.login(token, {...rest});
        }),
    retry: 0,
    onError,
  });
}
