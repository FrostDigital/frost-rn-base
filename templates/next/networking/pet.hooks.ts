import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ApiError} from "../models/ApiError";
import {Pet} from "../models/Pet";
import {useApiStore} from "../stores/ApiStore";

export function usePets() {
  const apiStore = useApiStore();

  return useQuery<Pet[], ApiError>({
    queryKey: ["pet"],
    queryFn: () => apiStore.get<Pet[]>({path: "/pet", isAuthRequired: true}).then(res => res.data),
  });
}

export function useCreatePet() {
  const apiStore = useApiStore();
  const queryClient = useQueryClient();

  return useMutation<any, ApiError, any>({
    mutationFn: (pet: Omit<Pet, "_id">) =>
      apiStore
        .post<Pet>({
          path: "/pet",
          body: pet,
          isAuthRequired: true,
        })
        .then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pet"],
      });
    },
  });
}
