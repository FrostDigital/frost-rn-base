import {useMutation} from "@tanstack/react-query";
import {ApiError} from "../models/ApiError";
import {useApiStore} from "../stores/ApiStore";
import {useAppStore} from "../stores/AppStore";

export function useAuth(onError: (error: ApiError) => any) {
  const post = useApiStore(state => state.post);
  const fakeLogin = useAppStore(state => state.fakeLogin);

  return useMutation<any, ApiError, any>({
    mutationFn: (auth: {username: string; password: string}) =>
      post<any /* TODO: Add type */>({
        path: "/login",
        body: {
          username: auth.username,
          password: auth.password,
        },
      }).then(() => {
        fakeLogin();
      }),
    retry: 0,
    onError,
  });
}
