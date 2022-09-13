import {
  Button,
  Container,
  Group,
  LoadingOverlay,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Profile } from "../types/profile.types";
import { IconPlus } from "@tabler/icons";
import AppContainer from "../components/AppContainer";
import AppHeader from "../components/AppHeader";
import ProfileList from "../components/ProfileList";
import ProfileCreateModal from "../components/ProfileCreateModal";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useQuery } from "@tanstack/react-query";
import { getUserProfiles } from "../services/profile.service";

// const profiles: Profile[] = [
//   {
//     _id: '63155369a49f6866c6a1d3ab',
//     userId: '631552e0a49f6866c6a1d3a8',
//     profileUsername: 'jessicapage',
//     profileName: 'Jessica Page',
//     profileDescription: 'Freelance Web Developer',
//     profilePhotoUrl:
//       'https://lh3.googleusercontent.com/a/AATXAJwM-FTxP8rCqsWNQXcyMkKj79NvY5UM8luqz8ET=s96-c',
//     createdAt: '2022-09-05T01:39:53.031Z',
//     updatedAt: '2022-09-05T01:39:53.031Z',
//   },
// ];

export default function DashboardPage() {
  const [opened, handlers] = useDisclosure(false);
  const { user } = useContext(AuthContext);

  //Using React Query to get info from backend
  //First argument is query key
  const { data: profiles } = useQuery(["profiles", user?._id], async () =>
    getUserProfiles(user?._id as string)
  );

  return (
    <AppContainer header={<AppHeader />}>
      <Container size="sm">
        <Stack spacing="xl">
          <Group position="apart">
            <Title order={2}>Profiles</Title>
            <Button leftIcon={<IconPlus size={16} />} onClick={handlers.open}>
              Create profile
            </Button>
          </Group>

          {profiles && <ProfileList profiles={profiles} />}
        </Stack>
      </Container>

      <ProfileCreateModal opened={opened} onClose={handlers.close} />
    </AppContainer>
  );
}
