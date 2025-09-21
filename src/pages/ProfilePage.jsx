import { CardProfile } from "../components/profile/CardProfile";
import { CardSettingChoice } from "../components/profile/CardSettingChoice";

export const ProfilePage = () => {
  return (
    <main className="bg-gray-300 flex flex-col p-10 gap-10 justify-center items-center lg:flex-row lg:items-start">
      <CardProfile />
      <CardSettingChoice />
    </main>
  );
};
