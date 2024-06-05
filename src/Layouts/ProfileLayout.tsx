import { NavBar } from "@/components";
import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
const ProfileLayout = () => {
  const token = getToken() || "";
  const { data, isLoading } = useGetMe(token);

  return (
    <div className="w-full">
      <NavBar />
      <div className="flex w-full h-screen">
        <div className="border-2 shadow-sm p-10 shoadw-border border-r-border w-[280px] h-full">
          {!isLoading && data && (
            <div className="flex items-center gap-3 profile">
              <img
                src={data.profilePicture}
                alt={data.profilePicture}
                className="rounded-full w-[60px] h-[60px]"
              />
              <span className="font-bold text-lg">{data.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
