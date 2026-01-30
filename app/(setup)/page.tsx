import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

export const dynamic = "force-dynamic";

const SetupPage = async () => {
  try {
    const profile = await initialProfile();

    const workspace = await db.workspace.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (workspace) {
      return redirect(`/workspaces/${workspace.id}`);
    }

    return <InitialModal />;
  } catch (error) {
    console.error("[SETUP_PAGE_ERROR]", error);
    // This will help see the error in Vercel logs
    throw error;
  }
};

export default SetupPage;
