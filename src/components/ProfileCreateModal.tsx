import { useContext, useState } from "react";
import {
  Button,
  Group,
  Input,
  Modal,
  ModalProps,
  Stack,
  TextInput,
  Text,
  FileButton,
  Textarea,
  Image,
  Alert,
} from "@mantine/core";
import { Profile } from "../types/profile.types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../libs/react-query";
import { addProfile } from "../services/profile.service";
import { AuthContext } from "../context/auth.context";
// import { uploadFile } from "../services/storage.service";
import { IconAlertCircle } from "@tabler/icons";
import { BaseError } from "../types/https.types";
import { AxiosError } from "axios";

interface Props extends ModalProps {}

export default function ProfileCreateModal({ opened, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Profile>();

  //mutation from react query
  //

  const addProfileMutation = useMutation(addProfile, {
    // onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles", user?._id]);
      handleClose();
    },
    onError: (error: AxiosError) => {
      setError("Oops! Something went wrong!");
    },
  });

  const onSubmit = async (data: Partial<Profile>) => {
    await addProfileMutation.mutateAsync({ userId: user?._id, ...data });
  };

  const handleClose = () => {
    //Clears form for us
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Create profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="sm">
          <Stack>
            <div>
              <Input.Wrapper
                label="Profile page URL"
                error={errors.profileName && "Profile name is required"}
              >
                <div className="flex rounded-md mb-1 mt-[2px]">
                  <div
                    style={{ border: "1px solid" }}
                    className="inline-flex items-center px-3 rounded-l !border-r-0 !border-gray-400 bg-gray-50 text-gray-600 sm:text-sm"
                  >
                    {window.location.host}/
                  </div>
                  <TextInput
                    className="flex-1"
                    classNames={{
                      input: "!rounded-l-none !bg-white !text-black",
                    }}
                    placeholder="username"
                    {...register("profileUsername", { required: true })}
                  />
                </div>
              </Input.Wrapper>
            </div>

            <div className="flex flex-col space-y-1">
              <Text component="label" size="sm" weight={500}>
                Profile image
              </Text>

              <div>
                <FileButton onChange={setFile} accept="image/png,image/jpeg">
                  {(props) => (
                    <Button variant="default" {...props} className="w-auto">
                      Upload image
                    </Button>
                  )}
                </FileButton>
              </div>
            </div>

            <TextInput
              label="Profile name"
              {...register("profileName", { required: true })}
              error={errors.profileName && "Profile name is required"}
            />
            <Textarea
              label="Profile description"
              autosize
              minRows={2}
              {...register("profileDescription")}
            />
          </Stack>

          <div className="mt-2">
            <Group spacing="sm" position="right">
              <Button variant="default" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                Create profile
              </Button>
            </Group>
          </div>
        </Stack>
      </form>
    </Modal>
  );
}
